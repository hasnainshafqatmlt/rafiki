import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import styles from './assets/scss/main.scss';

import Root from './config/Root';


const render = (Component) => {
	ReactDOM.render(
			<BrowserRouter>
				<Component />
			</BrowserRouter>,
		document.getElementById('root'),
	);
};

render(Root);

