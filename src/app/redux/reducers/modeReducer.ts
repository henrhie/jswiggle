import { ActionType } from '../action-types';
import { Action } from '../actions';

interface IState {
	activeMarkdown: 'html';
	activeScript: 'javascript' | 'typescript' | 'coffee';
	activeStyleSheet: 'sass' | 'less' | 'css' | 'scss';
}

const initialState: Partial<IState> = {
	activeMarkdown: 'html',
	activeStyleSheet: 'css',
	activeScript: 'javascript',
};

export const modeReducer = (
	state = initialState,
	action: Action
): Partial<IState> => {
	switch (action.type) {
		case ActionType.CSS:
			return {
				...state,
				activeStyleSheet: 'css',
			};
		case ActionType.LESS:
			return {
				...state,
				activeStyleSheet: 'less',
			};
		case ActionType.SASS:
			return {
				...state,
				activeStyleSheet: 'sass',
			};
		case ActionType.SCSS:
			return {
				...state,
				activeStyleSheet: 'scss',
			};
		case ActionType.JavaScript:
			return {
				...state,
				activeScript: 'javascript',
			};
		case ActionType.CoffeeScript:
			console.log('in coffeescript');
			return {
				...state,
				activeScript: 'coffee',
			};
		case ActionType.TypeScript:
			return {
				...state,
				activeScript: 'typescript',
			};
		default:
			return state;
	}
};
