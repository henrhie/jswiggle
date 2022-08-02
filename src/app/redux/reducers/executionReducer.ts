import { ActionType } from '../action-types';
import { Action } from '../actions';

interface IState {
	loading: boolean;
	bundle: string;
	logs: { payload: any; type: string }[];
	consoleInput: string;
}

const initialState: Partial<IState> = {
	loading: false,
	bundle: '',
	logs: [],
	consoleInput: '',
};

export const executionReducer = (
	state = initialState,
	action: Action
): Partial<IState> => {
	switch (action.type) {
		case ActionType.BUNDLE_START:
			return {
				...state,
				loading: true,
				logs: [...state.logs, { payload: 'Running fiddle', type: 'loading' }],
			};
		case ActionType.BUNDLE_COMPLETE:
			return { ...state, loading: false, bundle: action.payload.code };
		case ActionType.CLEAR_BUNDLE:
			return { ...state, bundle: '' };
		case ActionType.CONSOLE_LOGS:
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
			const nonErrorCode = state.consoleInput.substring(
				state.consoleInput.lastIndexOf(';'),
				-1
			);
			return {
				...state,
				logs: [...state.logs, ...sanitized],
				consoleInput: nonErrorCode,
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