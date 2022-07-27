import { Dispatch } from 'redux';
import { bundleCode } from '../../esbuild';
import { ActionType } from '../action-types';
import { Action, ModeType } from '../actions';
import { reducer } from '../reducer';

export const updateHTML = (content: string) => {
	return {
		type: ActionType.UPDATE_HTML_STORE,
		payload: content,
	};
};

export const updateCSS = (content: string) => {
	return {
		type: ActionType.UPDATE_CSS_STORE,
		payload: content,
	};
};

export const updateJavascript = (content: string) => {
	return {
		type: ActionType.UPDATE_JAVASCRIPT_STORE,
		payload: content,
	};
};

export const startBundle = (store: ReturnType<typeof reducer>) => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionType.BUNDLE_START,
		});

		const js = store._js;
		if (
			js.search(/import/g) < 0 &&
			store.activeScript === 'javascript' &&
			store.activeStyleSheet === 'css'
		) {
			const css_ = store._css;
			const escaped = css_
				.replace(/\n/g, '')
				.replace(/"/g, '\\"')
				.replace(/'/g, "\\'")
				.replace(/\r/g, '');

			const contents = `
			    var style = document.createElement("style");
			    style.innerText = "${escaped}";
			    document.head.appendChild(style);
			  `;
			const jsWithCss = `(() => {${js + contents}})()`;

			dispatch({
				type: ActionType.BUNDLE_COMPLETE,
				payload: {
					code: jsWithCss,
				},
			});
			return;
		}
		const buildOutput = await bundleCode(store);
		const output = buildOutput.outputFiles && buildOutput.outputFiles[0].text;

		console.log('bundled code', output);

		dispatch({
			type: ActionType.BUNDLE_COMPLETE,
			payload: {
				code: output,
			},
		});
	};
};

export const clearBundle = () => {
	return {
		type: ActionType.CLEAR_BUNDLE,
	};
};

export const updateConsoleLogs = (logs: []) => {
	return {
		type: ActionType.CONSOLE_LOGS,
		payload: logs,
	};
};

export const clearConsole = () => {
	return {
		type: ActionType.CLEAR_LOGS,
	};
};

export const clearLogsFromInput = () => {
	return {
		type: ActionType.CLEAR_CONSOLE_LOGS_FROM_INPUT,
	};
};

export const runConsoleInput = (input: string) => {
	return {
		type: ActionType.RUN_CONSOLE_INPUT,
		payload: input,
	};
};

export const updateMode = (mode: any) => {
	console.log('action creator mode: ', ActionType[mode]);
	return {
		type: ActionType[mode],
	};
};
