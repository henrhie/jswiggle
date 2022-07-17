import { ActionType } from './action-types';
import { Action } from './actions';

export interface IState {
	_html: string;
	_css: string;
	_js: string;
	loading: string;
	error: string;
	bundle: string;
	logs: any[];
}

const initState: Partial<IState> = {
	_html: '',
	_css: '',
	_js: '',
	bundle: '',
	logs: [],
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
				logs: [...state.logs, 'Running fiddle'],
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
			const sanitized = action.payload.map((log) => {
				return log[0];
			});
			return {
				...state,
				logs: [...state.logs, ...sanitized],
			};
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
