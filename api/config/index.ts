import { get } from 'env-var';

export const CONFIG_GLOBALS = {
	PORT: get('PORT_SERVER').default(3000).asPortNumber(),
	HOST: get('HOST_SERVER').default('localhost').asString(),
	SERVER: get('SERVER').default('https://apieverywhere.com').asString(),
	ENVIRONMENT: get('ENVIRONMENT').default('development').asString(),
	API_SERVER_PREFIX: get('API_SERVER_PREFIX').default('/api').asString(),
	API_SERVER_VERSION: get('API_SERVER_VERSION').default('v1').asString(),
	ROUTE: {
		USER: get('USER_ROUTE').default('/user').asString(),
		CATEGORY: get('CATEGORY_ROUTE').default('/category').asString(),
		AUTH: get('AUTH_ROUTE').default('/auth').asString(),
		PRODUCT: get('PRODUCT_ROUTE').default('/product').asString(),
		ORDER: get('ORDER_ROUTE').default('/order').asString(),
	},
	DATABASE: {
		MYSQL: {
			ACQUIRE: get('ACQUIRE_MYSQL').default(30000).asInt(),
			DB_NAME: get('DATABASE_MYSQL').default('beils').asString(),
			DIALECT: get('DIALECT_MYSQL').default('mysql').asString(),
			HOST: get('HOST_MYSQL').default('localhost').asString(),
			IDLE: get('IDLE_MYSQL').default(10000).asInt(),
			PASSWORD: get('PASSWORD_MYSQL').default('root').asString(),
			POOL_MAX: get('POOL_MAX_MYSQL').default(5).asInt(),
			POOL_MIN: get('POOL_MIN_MYSQL').default(0).asInt(),
			PORT: get('PORT_MYSQL').default(3306).asPortNumber(),
			TIMESTAMPS: get('TIMESTAMPS_MYSQL').default(1).asBool(),
			USERNAME: get('USERNAME_MYSQL').default('root').asString(),
		},
    TABLES: {
      AUTH: get('AUTH_TABLE').default('AUTH').asString(),
			CATEGORY: get('CATEGORY_TABLE').default('CATEGORY').asString(),
			USER: get('USER_TABLE').default('USER').asString(),
			CUSTOMER: get('CUSTOMER_TABLE').default('CUSTOMER').asString(),
			PRODUCT: get('PRODUCT_TABLE').default('PRODUCT').asString(),
			ORDER: get('ORDER_TABLE').default('ORDER').asString(),
		},
	},
	JWT: {
		SECRET: get('JWT_SECRET').default('chachipistachi').asString(),
		DURATION: get('JWT_DURATION').default('2h').asString(),
	},
};
