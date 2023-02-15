import winston, { format } from "winston";

export const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.cli(),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level} ${message}`;
    })
  ),
});
