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
			level: 'error.log',
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
if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: winston.format.simple(),
		}),
	);
}

export function buildLogger(service: string) {
	return {
		log: (message: string) => {
			logger.log('info', { message, service });
		},
		error: (message: string) => {
			logger.error('error', { message, service });
		},
	};
}
