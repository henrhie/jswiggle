import { ActionType } from '../action-types';

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
