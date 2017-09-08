'user strict';

/**
 * WARNING !!!
 * IF YOU ARE NOT A DEVELOPER YOU MUST NOT CHANGE ANYTHING IN THIS FILE !!!
 */

let SITE_STATIC_ASSETS = '../public/images/';

let API_URL = 'http://localhost:3333/api/v1'; // local env
//let API_URL = 'http://192.168.1.104:3333/api/v1'; // local env

if(process.env.NODE_ENV == 'development') {
	//API_URL = 'http://108.61.165.78:3333/api/v1';
} else if (process.env.NODE_ENV == 'production') {
	API_URL = 'http://localhost:3333/api/v1';
	SITE_STATIC_ASSETS = '../public/images/';
}

const App = {
	title: 'RAFIKI',
	description: 'RAFIKI',
	head: {
		defaultTitle: 'RAFIKI',
		titleTemplate: '%s | RAFIKI',
		meta: [
			{name: 'description', content: 'Rafiki	-	Los	mejores	expertos	en	Marke2ng	Digital'},
			{charset: 'utf-8'},
			{property: 'og:locale', content: 'en_US'},
			{property: 'og:title', content: 'RAFIKI'},
			{property: 'og:description', content: 'RAFIKI'},
			{property: 'og:site', content: 'RAFIKI'},
			{property: 'og:creator', content: 'RAFIKI'},
		]
	}
};

export default {
	App,
	SITE_STATIC_ASSETS,
	API_URL
};
