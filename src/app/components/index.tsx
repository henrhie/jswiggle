import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import { store } from '../redux/store';

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
