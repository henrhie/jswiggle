import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducer from './reducer';

export const store = configureStore({
	reducer: {
		state: reducer
	},
	middleware: [thunk]
});
