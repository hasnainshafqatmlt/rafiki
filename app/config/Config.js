'user strict';

/**
 * WARNING !!!
 * IF YOU ARE NOT A DEVELOPER YOU MUST NOT CHANGE ANYTHING IN THIS FILE !!!
 */

let SITE_STATIC_ASSETS = '../public/images/';

let API_URL = 'http://localhost:3333/api/v2'; // local env

if(process.env.NODE_ENV == 'development') {
	API_URL = 'http://188.166.225.132:3333/api/v2';
} else if (process.env.NODE_ENV == 'production') {
	API_URL = 'http://app.inseaders.vc:3333/api/v2';
	SITE_STATIC_ASSETS = '../public/images/';
}

const App = {
	title: 'Kogno',
	description: '',
	head: {
		//defaultTitle: 'INSEADERS',
		titleTemplate: '%s | Kogno',
		meta: [
			//{name: 'description', content: 'The global venture booster for INSEAD'},
			{charset: 'utf-8'},
			//{property: 'robots', content: 'index,follow'},
			
		]
	}
};

export default {
	App,
	SITE_STATIC_ASSETS,
	API_URL
};
