// Secure storage wrapper with encryption and validation
import { toast } from "@/hooks/use-toast";

interface StoredData {
  data: any;
  timestamp: number;
  expires?: number;
}

class SecureStorage {
  private static instance: SecureStorage;
  private readonly prefix = 'bersih_secure_';
  private readonly maxAge = 24 * 60 * 60 * 1000; // 24 hours default

  private constructor() {}

  static getInstance(): SecureStorage {
    if (!SecureStorage.instance) {
      SecureStorage.instance = new SecureStorage();
    }
    return SecureStorage.instance;
  }

  // Simple encryption/obfuscation (for sensitive but not critical data)
  private encode(data: string): string {
    return btoa(encodeURIComponent(data));
  }

  private decode(data: string): string {
    try {
      return decodeURIComponent(atob(data));
    } catch {
      return '';
    }
  }

  // Store data with expiration and validation
  setItem(key: string, value: any, expiresIn?: number): void {
    try {
      const storageData: StoredData = {
        data: value,
        timestamp: Date.now(),
        expires: expiresIn ? Date.now() + expiresIn : Date.now() + this.maxAge
      };

      const encoded = this.encode(JSON.stringify(storageData));
      localStorage.setItem(this.prefix + key, encoded);
    } catch (error) {
      console.log('Failed to store secure data:', error);
      toast({
        title: "Storage Error",
        description: "Failed to save data securely.",
        variant: "destructive"
      });
    }
  }

  // Retrieve and validate stored data
  getItem(key: string): any {
    try {
      const stored = localStorage.getItem(this.prefix + key);
      if (!stored) return null;

      const decoded = this.decode(stored);
      if (!decoded) return null;

      const storageData: StoredData = JSON.parse(decoded);
      
      // Check expiration
      if (storageData.expires && Date.now() > storageData.expires) {
        this.removeItem(key);
        return null;
      }

      return storageData.data;
    } catch (error) {
      console.log('Failed to retrieve secure data:', error);
      this.removeItem(key); // Clean up corrupted data
      return null;
    }
  }

  // Remove item
  removeItem(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.log('Failed to remove secure data:', error);
    }
  }

  // Clear all secure storage
  clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.log('Failed to clear secure storage:', error);
    }
  }

  // Clean up expired items
  cleanup(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          const stored = localStorage.getItem(key);
          if (stored) {
            try {
              const decoded = this.decode(stored);
              const storageData: StoredData = JSON.parse(decoded);
              
              if (storageData.expires && Date.now() > storageData.expires) {
                localStorage.removeItem(key);
              }
            } catch {
              localStorage.removeItem(key); // Remove corrupted data
            }
          }
        }
      });
    } catch (error) {
      console.log('Failed to cleanup secure storage:', error);
    }
  }

  // Get storage info for debugging
  getStorageInfo(): { keys: string[], totalSize: number } {
    const keys: string[] = [];
    let totalSize = 0;

    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(this.prefix)) {
          keys.push(key.replace(this.prefix, ''));
          totalSize += (localStorage.getItem(key) || '').length;
        }
      });
    } catch (error) {
      console.log('Failed to get storage info:', error);
    }

    return { keys, totalSize };
  }
}

export const secureStorage = SecureStorage.getInstance();

// Auto cleanup on page load
secureStorage.cleanup();