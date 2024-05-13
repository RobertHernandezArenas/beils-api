import express from 'express';
import swaggerUI from 'swagger-ui-express';
// import documentation from '../../documentation/swagger.json';
import { openAPIConfiguration } from '../docs/swagger';
import { userRouter } from './user.routes';

const routes = express.Router();

const swaggerOptions = {
	customCss: `
    .swagger-ui .topbar {
	    display: block;
    }

    .topbar-wrapper > .link > svg {
	    display: none;
    }
    `,
};
/**/

export const router = routes
	.use('/users', userRouter)
	.use(
		'/documentation',
		swaggerUI.serve,
		swaggerUI.setup(openAPIConfiguration, swaggerOptions),
	);
