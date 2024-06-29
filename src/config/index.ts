import path from 'path';

export const config = {
	api: {
		environment: process.env.NODE_ENVIRONMENT,
		host: process.env.HOST,
		port: process.env.PORT,
		root: process.env.ROOT,
		public_folder: path.join(
			__dirname,
			`../../../${process.env.PUBLIC_FOLDER}`,
		),
	},

	jwt: {
		secretKey: process.env.SECRET_KEY ?? 'secret',
		expiredIn: process.env.EXPIRATION_TOKEN ?? '30m',
	},

	nodemailer: {
		pool: process.env.POOL_NODEMAILER,
		host: process.env.HOST_NODEMAILER,
		service: process.env.SERVICE_NODEMAILER,
		port: process.env.PORT_NODEMAILER,
		secure: process.env.SECURE_NODEMAILER,
		tls: {
			ciphers: 'SSLv3',
		},
		debug: true,
		secureConnection: false,
		auth: {
			user: process.env.USER_EMAIL,
			pass: process.env.PASS_GOOGLEAPP_NODEMAILER,
		},
	},
	mysql: {
		database: process.env.MYSQL_DATABASE,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		config: {
			host: process.env.MYSQL_HOST,
			port: process.env.MYSQL_PORT,
			ssl: process.env.MYSQL_SSL,
			dialect: process.env.MYSQL_DIALECT,
			define: { timestamps: process.env.MYSQL_DEFINE_TIMESTAMPS },
			pool: {
				max: process.env.MYSQL_POOL_MAX,
				min: process.env.MYSQL_POOL_MIN,
				acquire: process.env.MYSQL_POOL_ACQUIRE,
				idle: process.env.MYSQL_POOL_IDLE,
			},
			operatorAliases: process.env.MYSQL_POOL_OPERATOR_ALIASES,
			// connectionLimit: process.env.MYSQL_CONNECTION_LIMITS,
			// timezone: process.env.MYSQL_TIMEZONE,
		},
	},
	email: {
		confirm: {
			activateQuery: 'activate?code=',
		},
	},
	pathFiles: {
		logo: process.env.LOGO_IMAGE_PATH,
		avatar: process.env.AVATAR_DEFAULT,
		email: {
			header_bg: process.env.HEADERBG_IMAGE_PATH,
		},
	},
};
