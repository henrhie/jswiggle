/* eslint-disable @typescript-eslint/naming-convention */
export enum ActionType {
	UPDATE_HTML_STORE = 'UPDATE:HTML',
	UPDATE_CSS_STORE = 'UPDATE:CSS',
	UPDATE_JAVASCRIPT_STORE = 'UPDATE:JAVASCRIPT',
	BUNDLE_START = 'BUNDLE:START',
	BUNDLE_COMPLETE = 'BUNDLE:COMPLETE',
	CONSOLE_LOGS = 'CONSOLE:LOGS',
	CLEAR_LOGS = 'CLEAR:LOGS',
	CLEAR_BUNDLE = 'CLEAR:BUNDLE',
	RUN_CONSOLE_INPUT = 'RUN:CONSOLE:INPUT',
	CLEAR_CONSOLE_LOGS_FROM_INPUT = 'CLEAR:CONSOLE:LOGS:FROM:INPUT',
}
