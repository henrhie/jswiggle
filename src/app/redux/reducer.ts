import { ActionType } from './action-types';
import { Action } from './actions';

interface IState {
	html: string;
	css: string;
	javascript: string;
}

const initState: Partial<IState> = {};

const reducer = (state = initState, action: Action) => {
	switch (action.type) {
		case ActionType.UPDATE_HTML_STORE:
			return {
				...state,
				html: action.payload,
			};
		case ActionType.UPDATE_CSS_STORE:
			return {
				...state,
				css: action.payload,
			};
		case ActionType.UPDATE_JAVASCRIPT_STORE:
			return {
				...state,
				javascript: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
