import "colors";
import moment from "moment";

class Logger {
  log(...message: string[]) {
    const time = moment().format("YYYY-MM-DD HH:mm");
    console.log(`[${time}]`.cyan, ...message);
  }

  info(...message: string[]) {
    this.log(...message.map((m) => m.blue));
  }

  error(...message: string[]) {
    this.log(...message.map((m) => m.red));
  }

  warn(...message: string[]) {
    this.log(...message.map((m) => m.yellow));
  }

  success(...message: string[]) {
    this.log(...message.map((m) => m.green));
  }
}

export const logger = new Logger();
