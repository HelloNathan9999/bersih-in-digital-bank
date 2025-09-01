/**
 * Enhanced secure client-side storage for sensitive financial and personal data
 * This replaces direct localStorage usage with encrypted storage and automatic expiration
 */

class SecureClientStorage {
  private static instance: SecureClientStorage;
  private readonly prefix = 'bersih_secure_';

  private constructor() {
    // Auto-cleanup on initialization
    this.cleanup();
  }

  static getInstance(): SecureClientStorage {
    if (!SecureClientStorage.instance) {
      SecureClientStorage.instance = new SecureClientStorage();
    }
    return SecureClientStorage.instance;
  }

  /**
   * Encrypt data using simple XOR cipher with rotating key
   * Note: This is basic obfuscation, not strong encryption
   */
  private encrypt(data: string): string {
    const key = 'bersih_secure_2025_key';
    let result = '';
    for (let i = 0; i < data.length; i++) {
      const keyChar = key.charCodeAt(i % key.length);
      const dataChar = data.charCodeAt(i);
      result += String.fromCharCode(dataChar ^ keyChar);
    }
    return btoa(result); // Base64 encode
  }

  /**
   * Decrypt data
   */
  private decrypt(encryptedData: string): string {
    try {
      const data = atob(encryptedData); // Base64 decode
      const key = 'bersih_secure_2025_key';
      let result = '';
      for (let i = 0; i < data.length; i++) {
        const keyChar = key.charCodeAt(i % key.length);
        const dataChar = data.charCodeAt(i);
        result += String.fromCharCode(dataChar ^ keyChar);
      }
      return result;
    } catch (error) {
      console.warn('Failed to decrypt data:', error);
      return '';
    }
  }

  /**
   * Store sensitive data with encryption and expiration
   */
  setItem(key: string, value: any, expiresInMs?: number): void {
    try {
      const data = {
        value: value,
        timestamp: Date.now(),
        expires: expiresInMs ? Date.now() + expiresInMs : null
      };

      const serialized = JSON.stringify(data);
      const encrypted = this.encrypt(serialized);
      
      localStorage.setItem(this.prefix + key, encrypted);
    } catch (error) {
      console.error('Failed to store secure data:', error);
    }
  }

  /**
   * Retrieve and decrypt sensitive data
   */
  getItem(key: string): any {
    try {
      const encrypted = localStorage.getItem(this.prefix + key);
      if (!encrypted) return null;

      const decrypted = this.decrypt(encrypted);
      if (!decrypted) return null;

      const data = JSON.parse(decrypted);
      
      // Check if data has expired
      if (data.expires && Date.now() > data.expires) {
        this.removeItem(key);
        return null;
      }

      return data.value;
    } catch (error) {
      console.warn('Failed to retrieve secure data:', error);
      this.removeItem(key); // Remove corrupted data
      return null;
    }
  }

  /**
   * Remove specific item
   */
  removeItem(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }

  /**
   * Clear all secure storage
   */
  clear(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  /**
   * Clean up expired items
   */
  cleanup(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        try {
          const encrypted = localStorage.getItem(key);
          if (encrypted) {
            const decrypted = this.decrypt(encrypted);
            if (decrypted) {
              const data = JSON.parse(decrypted);
              if (data.expires && Date.now() > data.expires) {
                localStorage.removeItem(key);
              }
            }
          }
        } catch (error) {
          // Remove corrupted items
          localStorage.removeItem(key);
        }
      }
    });
  }

  /**
   * Check if item exists and is valid
   */
  hasItem(key: string): boolean {
    return this.getItem(key) !== null;
  }

  /**
   * Get storage info for debugging
   */
  getStorageInfo(): { keys: string[], totalSize: number } {
    const keys = Object.keys(localStorage).filter(key => key.startsWith(this.prefix));
    const totalSize = keys.reduce((size, key) => {
      const item = localStorage.getItem(key);
      return size + (item ? item.length : 0);
    }, 0);

    return {
      keys: keys.map(key => key.replace(this.prefix, '')),
      totalSize
    };
  }
}

// Export singleton instance
export const secureClientStorage = SecureClientStorage.getInstance();

// Auto-cleanup every 5 minutes
setInterval(() => {
  secureClientStorage.cleanup();
}, 5 * 60 * 1000);