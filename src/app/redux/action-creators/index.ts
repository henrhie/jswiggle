import { Dispatch } from 'redux';
import { bundleCode } from '../../esbuild';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { reducer } from '../reducer';

export const updateHTML = (content: string) => {
	return {
		type: ActionType.UPDATE_HTML_STORE,
		payload: content,
	};
};

export const updateCSS = (content: string) => {
	return {
		type: ActionType.UPDATE_CSS_STORE,
		payload: content,
	};
};

export const updateJavascript = (content: string) => {
	return {
		type: ActionType.UPDATE_JAVASCRIPT_STORE,
		payload: content,
	};
};

export const startBundle = (store: ReturnType<typeof reducer>) => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionType.BUNDLE_START,
		});

		const buildOutput = await bundleCode(store);
		const outputText =
			buildOutput.outputFiles && buildOutput.outputFiles[0].text;

		dispatch({
			type: ActionType.BUNDLE_COMPLETE,
			payload: {
				code: outputText,
			},
		});
	};
};

export const clearBundle = () => {
	return {
		type: ActionType.CLEAR_BUNDLE,
	};
};

export const updateConsoleLogs = (logs: []) => {
	console.log('logs in action creator: ', logs);
	return {
		type: ActionType.CONSOLE_LOGS,
		payload: logs,
	};
};

export const clearConsole = () => {
	return {
		type: ActionType.CLEAR_LOGS,
	};
};

export const runConsoleInput = (input: string) => {
	return {
		type: ActionType.RUN_CONSOLE_INPUT,
		payload: input,
	};
};
