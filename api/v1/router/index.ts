import { userRouter } from '@/components/User/User.router';
import { CONFIG_GLOBALS } from '@/config';
import { Request, Response, Router } from 'express';
// import swaggerUI from 'swagger-ui-express';
// import documentation from '../../documentation/swagger.json';
// import { openAPIConfiguration } from '../config/docs/swagger';
// import User from '../components/User';
const { ROUTE, API_SERVER_PREFIX, API_SERVER_VERSION } = CONFIG_GLOBALS;
const USER_ENDPOINT = `${API_SERVER_PREFIX}${API_SERVER_VERSION}${ROUTE.USER}`;

export const APP_ROUTER = Router().use(USER_ENDPOINT, userRouter);

// .use('/users', User.router)
/* .use(
    '/',
    swaggerUI.serve,
    swaggerUI.setup(openAPIConfiguration, swaggerOptions),
  ); */
