// Security monitoring and audit logging
import { supabase } from '@/integrations/supabase/client';

export class SecurityMonitor {
  private static instance: SecurityMonitor;
  private suspiciousAttempts = 0;
  private lastAttemptTime = 0;
  private readonly maxAttempts = 5;
  private readonly timeWindow = 15 * 60 * 1000; // 15 minutes

  private constructor() {}

  static getInstance(): SecurityMonitor {
    if (!SecurityMonitor.instance) {
      SecurityMonitor.instance = new SecurityMonitor();
    }
    return SecurityMonitor.instance;
  }

  // Log security events
  async logSecurityEvent(eventType: string, details?: any) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.rpc('log_security_event', {
        p_event_type: eventType,
        p_details: details || {},
        p_user_id: user.id,
      });

      if (error) {
        console.error('Failed to log security event:', error);
      }
    } catch (error) {
      console.error('Security logging error:', error);
    }
  }

  // Track failed authentication attempts
  trackFailedAttempt() {
    const now = Date.now();
    
    // Reset counter if time window has passed
    if (now - this.lastAttemptTime > this.timeWindow) {
      this.suspiciousAttempts = 0;
    }

    this.suspiciousAttempts++;
    this.lastAttemptTime = now;

    // Log suspicious activity
    if (this.suspiciousAttempts >= this.maxAttempts) {
      this.logSecurityEvent('multiple_failed_attempts', {
        attempts: this.suspiciousAttempts,
        timeWindow: this.timeWindow
      });
    }

    return this.suspiciousAttempts >= this.maxAttempts;
  }

  // Reset attempt counter
  resetAttempts() {
    this.suspiciousAttempts = 0;
  }

  // Check for suspicious patterns
  async checkSuspiciousActivity(): Promise<boolean> {
    try {
      // Check recent failed attempts from database
      const { data, error } = await supabase
        .from('activity_logs_user')
        .select('created_at, activity_type')
        .eq('activity_type', 'login_failed')
        .gte('created_at', new Date(Date.now() - this.timeWindow).toISOString())
        .limit(this.maxAttempts);

      if (error) {
        console.error('Failed to check suspicious activity:', error);
        return false;
      }

      return (data?.length || 0) >= this.maxAttempts;
    } catch (error) {
      console.error('Suspicious activity check error:', error);
      return false;
    }
  }

  // Validate session integrity
  async validateSession(): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        return false;
      }

      // Check if session is close to expiry (refresh if < 5 minutes left)
      const expiresAt = session.expires_at ? new Date(session.expires_at * 1000) : null;
      const now = new Date();
      
      if (expiresAt && (expiresAt.getTime() - now.getTime()) < 5 * 60 * 1000) {
        const { error } = await supabase.auth.refreshSession();
        if (error) {
          console.error('Session refresh failed:', error);
          this.logSecurityEvent('session_refresh_failed', { error: error.message });
          return false;
        }
        
        this.logSecurityEvent('session_refreshed');
      }

      return true;
    } catch (error) {
      console.error('Session validation error:', error);
      return false;
    }
  }

  // Monitor for unusual patterns
  async monitorUserBehavior(action: string, metadata?: any) {
    try {
      this.logSecurityEvent(`user_action_${action}`, {
        action,
        metadata,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    } catch (error) {
      console.error('Behavior monitoring error:', error);
    }
  }
}

export const securityMonitor = SecurityMonitor.getInstance();

// Auto-validate session every 5 minutes
setInterval(() => {
  securityMonitor.validateSession();
}, 5 * 60 * 1000);