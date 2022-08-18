import { ActionType } from '../action-types';
import { Action } from '../actions';

interface IState {
	activeMarkdown: 'html';
	activeScript: 'javascript' | 'typescript' | 'coffeescript';
	activeStyleSheet: 'sass' | 'less' | 'css' | 'scss';
	jsxFactory: 'React' | 'Preact' | 'PureJs';
}

const initialState: Partial<IState> = {
	activeMarkdown: 'html',
	activeStyleSheet: 'css',
	activeScript: 'javascript',
	jsxFactory: 'React',
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
			return {
				...state,
				activeScript: 'coffeescript',
			};
		case ActionType.TypeScript:
			return {
				...state,
				activeScript: 'typescript',
			};
		case ActionType.React: {
			return {
				...state,
				jsxFactory: 'React',
			};
		}
		case ActionType.Preact: {
			return {
				...state,
				jsxFactory: 'Preact',
			};
		}
		case ActionType.PureJs: {
			return {
				...state,
				jsxFactory: 'PureJs',
			};
		}
		default:
			return state;
	}
};
