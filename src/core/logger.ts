import "colors";
import winston, { createLogger } from "winston";
import { Config } from "./config";
import moment from "moment";

export const logger = createLogger({
  level: Config.isDevelopment ? "debug" : "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize({ all: true }),
    winston.format.simple(),
    winston.format.printf((props) => {
      const { timestamp, level, message, ...others } = props;

      const formatedTimestamp = moment(timestamp as any).format(
        "YYY-MM-DD HH:mm:ss"
      );

      return `[${formatedTimestamp.cyan}] ${level}: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});
