/**
 * Logger - Centralized logging utility
 * Provides consistent logging across the test suite
 */

export enum LogLevel {
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

class Logger {
  private currentLogLevel: LogLevel = LogLevel.INFO;

  setLogLevel(level: LogLevel): void {
    this.currentLogLevel = level;
  }

  private log(level: LogLevel, message: string, data?: any): void {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level}]`;

    if (data) {
      console.log(`${prefix} ${message}`, data);
    } else {
      console.log(`${prefix} ${message}`);
    }
  }

  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  debug(message: string, data?: any): void {
    if (this.currentLogLevel === LogLevel.DEBUG) {
      this.log(LogLevel.DEBUG, message, data);
    }
  }

  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, data?: any): void {
    this.log(LogLevel.ERROR, message, data);
  }
}

export const logger = new Logger();
