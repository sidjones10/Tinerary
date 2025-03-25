// Simple logger utility

type LogLevel = "debug" | "info" | "warn" | "error"

class Logger {
  private context: string
  private minLevel: LogLevel

  // Map log levels to numeric values for comparison
  private levelValues: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  }

  constructor(context = "app", minLevel: LogLevel = "info") {
    this.context = context
    this.minLevel = minLevel
  }

  private shouldLog(level: LogLevel): boolean {
    return this.levelValues[level] >= this.levelValues[this.minLevel]
  }

  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = new Date().toISOString()
    const dataString = data ? ` ${JSON.stringify(data)}` : ""
    return `[${timestamp}] [${level.toUpperCase()}] [${this.context}] ${message}${dataString}`
  }

  debug(message: string, data?: any): void {
    if (this.shouldLog("debug")) {
      console.debug(this.formatMessage("debug", message, data))
    }
  }

  info(message: string, data?: any): void {
    if (this.shouldLog("info")) {
      console.info(this.formatMessage("info", message, data))
    }
  }

  warn(message: string, data?: any): void {
    if (this.shouldLog("warn")) {
      console.warn(this.formatMessage("warn", message, data))
    }
  }

  error(message: string, error?: any): void {
    if (this.shouldLog("error")) {
      console.error(this.formatMessage("error", message, error))
      if (error instanceof Error) {
        console.error(error.stack)
      }
    }
  }

  // Create a child logger with a new context
  child(context: string): Logger {
    return new Logger(`${this.context}:${context}`, this.minLevel)
  }
}

// Create and export the default logger
export const logger = new Logger()

// Export the Logger class for creating custom loggers
export { Logger }

