// src/core/utils/logger.ts
import { env } from "bun";

const enum Colors {
  Info = "\x1b[36m",
  Success = "\x1b[32m",
  Warn = "\x1b[33m",
  Error = "\x1b[31m",
  Debug = "\x1b[35m",
  Reset = "\x1b[0m",
  Gray = "\x1b[90m",
}

type LogLevel = "debug" | "info" | "success" | "warn" | "error";

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  success: 2,
  warn: 3,
  error: 4,
};

const getCurrentLogLevel = (): number => {
  const level = env.LOG_LEVEL?.toLowerCase() as LogLevel || "info";
  return LOG_LEVELS[level] ?? 1; // default info
};

const getLogFormat = (): "text" | "json" => {
  return env.LOG_FORMAT?.toLowerCase() === "json" ? "json" : "text";
};

const shouldLog = (level: LogLevel): boolean => {
  return LOG_LEVELS[level] >= getCurrentLogLevel();
};

const formatMessage = (level: LogLevel, msg: string, args: any[]): string | object => {
  const timestamp = new Date().toISOString();
  const format = getLogFormat();

  if (format === "json") {
    return {
      timestamp,
      level,
      message: msg,
      ...(args.length > 0 && { extra: args }),
    };
  }

  const levelUpper = level.toUpperCase();
  const color = level === "debug" ? Colors.Debug : level === "info" ? Colors.Info : level === "success" ? Colors.Success : level === "warn" ? Colors.Warn : Colors.Error;
  return `${Colors.Gray}[${timestamp}] [${levelUpper}]${Colors.Reset} ${color}${msg}${Colors.Reset}`;
};

export const Log = {
  debug: (msg: string, ...args: any[]) => {
    if (shouldLog("debug")) {
      const formatted = formatMessage("debug", msg, args);
      if (typeof formatted === "object") {
        console.log(JSON.stringify(formatted));
      } else {
        console.log(formatted, ...args);
      }
    }
  },

  info: (msg: string, ...args: any[]) => {
    if (shouldLog("info")) {
      const formatted = formatMessage("info", msg, args);
      if (typeof formatted === "object") {
        console.log(JSON.stringify(formatted));
      } else {
        console.log(formatted, ...args);
      }
    }
  },

  success: (msg: string, ...args: any[]) => {
    if (shouldLog("success")) {
      const formatted = formatMessage("success", msg, args);
      if (typeof formatted === "object") {
        console.log(JSON.stringify(formatted));
      } else {
        console.log(formatted, ...args);
      }
    }
  },

  warn: (msg: string, ...args: any[]) => {
    if (shouldLog("warn")) {
      const formatted = formatMessage("warn", msg, args);
      if (typeof formatted === "object") {
        console.log(JSON.stringify(formatted));
      } else {
        console.warn(formatted, ...args);
      }
    }
  },

  error: (msg: string, ...args: any[]) => {
    if (shouldLog("error")) {
      const formatted = formatMessage("error", msg, args);
      if (typeof formatted === "object") {
        console.error(JSON.stringify(formatted));
      } else {
        console.error(formatted, ...args);
      }
    }
  },
};
