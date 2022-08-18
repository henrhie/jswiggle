import { ActionType } from '../action-types';

export interface UpdateMarkdownAction {
	type: ActionType.UPDATE_MARKDOWN;
	payload: string;
}

export interface UpdateStylesheetAction {
	type: ActionType.UPDATE_STYLESHEET;
	payload: string;
}

export interface UpdateScriptAction {
	type: ActionType.UPDATE_SCRIPT;
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

export interface ClearConsoleLogsFromInput {
	type: ActionType.CLEAR_CONSOLE_LOGS_FROM_INPUT;
}

export type ModeType =
	| ActionType.TypeScript
	| ActionType.JavaScript
	| ActionType.CoffeeScript
	| ActionType.CSS
	| ActionType.LESS
	| ActionType.SASS
	| ActionType.SCSS
	| ActionType.React
	| ActionType.Preact
	| ActionType.PureJs;

export interface UpdateMode {
	type: ModeType;
}

export type Action =
	| UpdateMarkdownAction
	| UpdateScriptAction
	| UpdateStylesheetAction
	| BundleCompleteAction
	| ConsoleLogs
	| ClearLogs
	| ClearBundle
	| ClearConsoleLogsFromInput
	| RunConsoleInput
	| BundleStartAction
	| UpdateMode;
