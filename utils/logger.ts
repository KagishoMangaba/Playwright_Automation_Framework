import * as fs from "fs";
import * as path from "path";

export type LogLevel = "info" | "warn" | "error" | "debug";

export class Logger {
    private readonly context: string;
    private readonly logToFile: boolean;
    private readonly logFilePath!: string;
    

    constructor(context: string, logToFile = false, logDir = "logs") {
        this.context = context;
        this.logToFile = logToFile;

        if (logToFile) {
            if (!fs.existsSync(logDir)) {
                fs.mkdirSync(logDir, { recursive: true });
            }
            const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
            this.logFilePath = path.join(logDir, `${timestamp}.log`);
        }
    }

    private format(level: LogLevel, message: string): string {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level.toUpperCase()}] [${this.context}] ${message}`;
    }

    private write(level: LogLevel, message: string): void {
        const formatted = this.format(level, message);

        switch (level) {
            case "info":
                console.log(formatted);
                break;
            case "warn":
                console.warn(formatted);
                break;
            case "error":
                console.error(formatted);
                break;
            case "debug":
                console.debug(formatted);
                break;
        }

        if (this.logToFile) {
            fs.appendFileSync(this.logFilePath, formatted + "\n");
        }
    }

    info(message: string): void {
        this.write("info", message);
    }

    warn(message: string): void {
        this.write("warn", message);
    }

    error(message: string): void {
        this.write("error", message);
    }

    debug(message: string): void {
        this.write("debug", message);
    }
}

////