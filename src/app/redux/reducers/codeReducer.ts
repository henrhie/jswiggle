import { ActionType } from '../action-types';
import { Action } from '../actions';

interface IState {
	markdown: string;
	stylesheet: string;
	script: string;
}

const initialState: Partial<IState> = {
	markdown: '',
	stylesheet: '',
	script: '',
};

export const codeReducer = (
	state = initialState,
	action: Action
): Partial<IState> => {
	switch (action.type) {
		case ActionType.UPDATE_MARKDOWN:
			return { ...state, markdown: action.payload };
		case ActionType.UPDATE_SCRIPT:
			return { ...state, script: action.payload };
		case ActionType.UPDATE_STYLESHEET:
			return { ...state, stylesheet: action.payload };
		default:
			return state;
	}
};
