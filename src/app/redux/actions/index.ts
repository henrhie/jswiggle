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
	};
}

export interface ConsoleLogs {
	type: ActionType.CONSOLE_LOGS;
	payload: [];
}

export interface ClearLogs {
	type: ActionType.CLEAR_LOGS;
}

export interface ClearBundle {
	type: ActionType.CLEAR_BUNDLE;
}

export interface RunConsoleInput {
	type: ActionType.RUN_CONSOLE_INPUT;
	payload: string;
}

export type Action =
	| UpdateCSSAction
	| UpdateHTMLAction
	| UpdateJavascriptAction
	| BundleCompleteAction
	| ConsoleLogs
	| ClearLogs
	| ClearBundle
	| RunConsoleInput
	| BundleStartAction;
