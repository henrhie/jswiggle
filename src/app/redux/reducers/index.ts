import { combineReducers } from 'redux';
import { codeReducer } from './codeReducer';
import { executionReducer } from './executionReducer';
import { modeReducer } from './modeReducer';

export const reducer = combineReducers({
	code: codeReducer,
	execution: executionReducer,
	mode: modeReducer,
});

export type IState = ReturnType<typeof reducer>;
