import { Router } from 'express';
// import swaggerUI from 'swagger-ui-express';
// import documentation from '../../documentation/swagger.json';
// import { openAPIConfiguration } from '../config/docs/swagger';
// import User from '../components/User';

export const routes = Router();

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


	// .use('/users', User.router)
	/* .use(
		'/',
		swaggerUI.serve,
		swaggerUI.setup(openAPIConfiguration, swaggerOptions),
	); */
