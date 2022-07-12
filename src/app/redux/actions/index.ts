import { ActionType } from '../action-types';

export interface UpdateHTMLAction {
	type: ActionType.UPDATE_HTML_STORE;
	payload: string;
}

export interface UpdateCSSAction {
	type: ActionType.UPDATE_CSS_STORE;
	payload: string;
}

export interface UpdateJavascriptAction {
	type: ActionType.UPDATE_JAVASCRIPT_STORE;
	payload: string;
}

export interface BundleStartAction {
	type: ActionType.BUNDLE_START;
}

export interface BundleCompleteAction {
	type: ActionType.BUNDLE_COMPLETE;
	payload: {
		code: string;
	}
}

export type Action =
	| UpdateCSSAction
	| UpdateHTMLAction
	| UpdateJavascriptAction
	| BundleCompleteAction
	| BundleStartAction;
