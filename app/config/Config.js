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
	title: 'INSEADERS',
	description: 'The global venture booster for INSEAD',
	head: {
		defaultTitle: 'INSEADERS',
		titleTemplate: '%s | INSEADERS',
		meta: [
			{name: 'description', content: 'The global venture booster for INSEAD'},
			{charset: 'utf-8'},
			{property: 'robots', content: 'index,follow'},
			{property: 'copyright', content: 'INSEADERS'},
			{property: 'author', content: 'INSEADERS'},
			{property: 'og:site_name', content: 'INSEADERS'},
			{property: 'og:image', content: 'http://inseaders.vc/images/logo-inseaders.jpg'},
			{property: 'og:locale', content: 'en_US'},
			{property: 'og:title', content: 'INSEADERS'},
			{property: 'og:description', content: 'The global venture booster for INSEAD'},
			{property: 'og:site', content: 'INSEADERS'},
			{property: 'og:creator', content: 'INSEADERS'},
			{property: 'og:image:width', content: '470'},
			{property: 'og:image:height', content: '275'}
		]
	}
};

export default {
	App,
	SITE_STATIC_ASSETS,
	API_URL
};
