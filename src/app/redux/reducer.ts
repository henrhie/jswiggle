import { ActionType } from './action-types';
import { Action } from './actions';

export interface IState {
	_html: string;
	_css: string;
	_js: string;
	loading: string;
	error: string;
	bundle: string;
}

const initState: Partial<IState> = {_html: '', _css: '', _js: '', bundle: ''};

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
			};
		case ActionType.BUNDLE_COMPLETE:
			return {
				...state,
				loading: false,
				bundle: action.payload.code,
			};
		default:
			return state;
	}
};

export default reducer;
