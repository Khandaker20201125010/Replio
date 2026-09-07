import pino from "pino";
import pinoPretty from "pino-pretty";
import { env } from "../config/env";

const isDevelopment = env.NODE_ENV === "development";

export const logger = pino(
  {
    level: isDevelopment ? "debug" : "info",
    base: {
      env: env.NODE_ENV,
    },
  },
  isDevelopment
    ? pinoPretty({
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      })
    : undefined,
);
