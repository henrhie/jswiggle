import { BuildResult, OutputFile } from 'esbuild-wasm';
import { Dispatch } from 'redux';
import { bundleCode } from '../../esbuild';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { IState } from '../reducers';

export const updateMarkdown = (content: string) => {
	return {
		type: ActionType.UPDATE_MARKDOWN,
		payload: content,
	};
};

export const updateStylesheet = (content: string) => {
	return {
		type: ActionType.UPDATE_STYLESHEET,
		payload: content,
	};
};

export const updateScript = (content: string) => {
	return {
		type: ActionType.UPDATE_SCRIPT,
		payload: content,
	};
};

export const startBundle = (store: IState) => {
	//@ts-ignore
	return async (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionType.BUNDLE_START,
		});
		const { code, mode } = store;
		const js = code.script;
		if (
			js.search(/import/g) < 0 &&
			mode.activeScript === 'javascript' &&
			mode.activeStyleSheet === 'css'
		) {
			const css_ = code.stylesheet;
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

			return dispatch({
				type: ActionType.BUNDLE_COMPLETE,
				payload: {
					code: jsWithCss,
				},
			});
		}
		let buildOutput: BuildResult & { outputFiles: OutputFile[] };
		try {
			buildOutput = await bundleCode(store);
		} catch (err) {
			console.log('error from esbuild: ', err);
			dispatch({
				type: ActionType.CONSOLE_LOGS,
				payload: [[{ err, isEsbuildError: true }]] as any,
			});
			return dispatch({
				type: ActionType.BUNDLE_COMPLETE,
				payload: { code: '' },
			});
		}
		const output = buildOutput.outputFiles && buildOutput.outputFiles[0].text;

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

export const updateJsxFactory = (factory: string) => {
	return {
		type: ActionType[factory],
	};
};
