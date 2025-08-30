// Centralized error handling and logging
import { toast } from "@/hooks/use-toast";
import { securityMonitor } from './security-monitor';

export interface AppError {
  code: string;
  message: string;
  details?: any;
  userMessage?: string;
}

export class ErrorHandler {
  private static instance: ErrorHandler;

  private constructor() {}

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  // Log error without exposing sensitive information
  private logError(error: any, context?: string): void {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      context: context || 'unknown',
      message: error?.message || 'Unknown error',
      type: error?.name || 'Error'
    };

    // Only log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('App Error:', logEntry);
    }

    // Log security-related errors
    if (context?.includes('auth') || context?.includes('security')) {
      securityMonitor.logSecurityEvent('error_occurred', {
        context,
        errorType: error?.name,
        timestamp
      });
    }
  }

  // Handle authentication errors
  handleAuthError(error: any, context: string = 'authentication'): void {
    this.logError(error, context);

    let userMessage = 'Terjadi kesalahan pada sistem autentikasi';
    
    if (error?.message?.includes('Invalid')) {
      userMessage = 'Kredensial tidak valid';
    } else if (error?.message?.includes('Network')) {
      userMessage = 'Gagal terhubung ke server';
    } else if (error?.message?.includes('Session')) {
      userMessage = 'Sesi telah berakhir, silakan login kembali';
    }

    toast({
      title: "Error Autentikasi",
      description: userMessage,
      variant: "destructive"
    });
  }

  // Handle API errors
  handleApiError(error: any, context: string = 'api'): void {
    this.logError(error, context);

    let userMessage = 'Terjadi kesalahan pada server';
    
    if (error?.status === 403) {
      userMessage = 'Akses ditolak';
    } else if (error?.status === 404) {
      userMessage = 'Data tidak ditemukan';
    } else if (error?.status === 429) {
      userMessage = 'Terlalu banyak permintaan, coba lagi nanti';
    } else if (error?.status >= 500) {
      userMessage = 'Server sedang bermasalah, coba lagi nanti';
    }

    toast({
      title: "Error Server",
      description: userMessage,
      variant: "destructive"
    });
  }

  // Handle validation errors
  handleValidationError(field: string, message: string): void {
    toast({
      title: "Data Tidak Valid",
      description: `${field}: ${message}`,
      variant: "destructive"
    });
  }

  // Handle network errors
  handleNetworkError(error: any): void {
    this.logError(error, 'network');

    toast({
      title: "Masalah Koneksi",
      description: "Periksa koneksi internet Anda dan coba lagi",
      variant: "destructive"
    });
  }

  // Handle storage errors
  handleStorageError(error: any, operation: string): void {
    this.logError(error, `storage_${operation}`);

    toast({
      title: "Error Penyimpanan",
      description: "Gagal menyimpan data, coba lagi",
      variant: "destructive"
    });
  }

  // Generic error handler
  handleError(error: any, context?: string): void {
    this.logError(error, context);

    // Determine error type and handle accordingly
    if (error?.name === 'AuthError' || context?.includes('auth')) {
      this.handleAuthError(error, context);
    } else if (error?.status || context?.includes('api')) {
      this.handleApiError(error, context);
    } else if (error?.name === 'NetworkError' || error?.message?.includes('fetch')) {
      this.handleNetworkError(error);
    } else {
      // Generic error
      toast({
        title: "Error",
        description: "Terjadi kesalahan yang tidak terduga",
        variant: "destructive"
      });
    }
  }
}

export const errorHandler = ErrorHandler.getInstance();