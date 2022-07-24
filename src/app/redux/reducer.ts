import { ActionType } from './action-types';
import { Action } from './actions';

export interface IState {
	_html: string;
	_css: string;
	_js: string;
	loading: string;
	error: string;
	bundle: string;
	logs: { payload: any; type: string }[];
	consoleInput: string;
}

const initState: Partial<IState> = {
	_html: '',
	_css: '',
	_js: '',
	bundle: '',
	logs: [],
	consoleInput: '',
};

export const reducer = (state = initState, action: Action) => {
	switch (action.type) {
		case ActionType.UPDATE_HTML_STORE:
			return {
				...state,
				_html: action.payload,
			};
		case ActionType.UPDATE_CSS_STORE:
			return {
				...state,
				_css: action.payload,
			};
		case ActionType.UPDATE_JAVASCRIPT_STORE:
			return {
				...state,
				_js: action.payload,
			};
		case ActionType.BUNDLE_START:
			return {
				...state,
				loading: true,
				logs: [...state.logs, { payload: 'Running fiddle', type: 'loading' }],
			};
		case ActionType.BUNDLE_COMPLETE:
			return {
				...state,
				loading: false,
				bundle: action.payload.code,
			};
		case ActionType.CLEAR_BUNDLE:
			return {
				...state,
				bundle: '',
			};
		case ActionType.CONSOLE_LOGS:
			console.log('action.payload: ', action.payload);
			const sanitized = action.payload.map((log: any) => {
				let logPayload = log[0];
				if (
					typeof logPayload === 'object' &&
					logPayload.hasOwnProperty('err')
				) {
					return { payload: logPayload.err.stack, type: 'err_output' };
				}
				return { payload: log[0], type: 'iframe_output' };
			});
			const withoutErroredCode = state.consoleInput.substring(
				state.consoleInput.lastIndexOf(';'),
				-1
			);
			return {
				...state,
				logs: [...state.logs, ...sanitized],
				consoleInput: withoutErroredCode,
			};
		case ActionType.RUN_CONSOLE_INPUT: {
			return {
				...state,
				consoleInput: state.consoleInput + ';' + action.payload,
				logs: [...state.logs, { payload: 'Running fiddle', type: 'loading' }],
			};
		}
		case ActionType.CLEAR_CONSOLE_LOGS_FROM_INPUT: {
			const clgMatch = /console.*/s;
			return {
				...state,
				consoleInput: state.consoleInput.replace(clgMatch, ''),
			};
		}
		case ActionType.CLEAR_LOGS:
			return {
				...state,
				logs: [],
			};
		default:
			return state;
	}
};

export default reducer;
