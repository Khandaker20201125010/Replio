"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const env_2 = require("../config/env");
const isDevelopment = env_2.env.NODE_ENV === "development";
exports.logger = (0, pino_1.default)(
  {
    level: isDevelopment ? "debug" : "info",
    base: {
      env: env_2.env.NODE_ENV,
    },
  },
  isDevelopment
    ? (0, pino_pretty_1.default)({
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      })
    : undefined,
);
//# sourceMappingURL=logger.js.map
