import { CONFIG_GLOBALS } from '@config/index';
import winston from 'winston';

const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
	level: 'info',
	format: combine(timestamp(), json()),
	// defaultMeta: { service: 'user-service' },
	transports: [
		//
		// - Write all logs with importance level of `error` or less to `error.log`
		// - Write all logs with importance level of `info` or less to `combined.log`
		//
		new winston.transports.File({
			filename: 'log/error.log',
			level: 'error',
		}),
		new winston.transports.File({
			filename: 'log/combined.log',
		}),
	],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (CONFIG_GLOBALS.ENVIRONMENT !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: winston.format.simple(),
		}),
	);
}

export function buildLogger(file: string) {
	return {
		log: (message: string, line?: number | string) => {
			const lineNumber = line ?? getCallerLine();
			logger.info(message, { file, line: lineNumber });
		},
		error: (message: string, line?: number | string) => {
			const lineNumber = line ?? getCallerLine();
			logger.error(message, { file, line: lineNumber });
		},
	};
}

function getCallerLine(): string {
	const stack = new Error().stack;
	if (!stack) return '';

	const stackLines = stack.split('\n');
	// 0: Error
	// 1: at getCallerLine
	// 2: at Object.log/error (dentro de buildLogger)
	// 3: at Caller (donde se llamó al logger)
	const callerLine = stackLines[3];
	if (!callerLine) return '';

	const match = callerLine.match(/:(\d+):\d+\)?$/);
	return match ? match[1] : '';
}
