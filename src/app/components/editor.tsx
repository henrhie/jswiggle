/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';

// import { Controlled as CodeMirror } from 'react-codemirror2';

import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-coffee';
import 'ace-builds/src-noconflict/mode-less';
import 'ace-builds/src-noconflict/mode-sass';
import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-noconflict/theme-one_dark';
import 'ace-builds/src-noconflict/ext-language_tools';

import 'ace-builds/src-noconflict/ext-error_marker';
import 'ace-builds/src-noconflict/ext-language_tools';

import { useTypedSelector } from '../hooks/use-typed-selector';

interface EditorProps {
	value: string;
	handleValueChange: (v: string, e: Event) => void;
	language: string;
	editorType: string;
}

const Editor: React.FC<EditorProps> = ({
	value,
	handleValueChange,
	editorType,
}) => {
	const { activeMarkdown, activeScript, activeStyleSheet } = useTypedSelector(
		({ activeMarkdown, activeScript, activeStyleSheet }) => {
			return {
				activeMarkdown,
				activeScript,
				activeStyleSheet,
			};
		}
	);

	let mode: string;

	switch (editorType) {
		case 'markdown':
			mode = activeMarkdown;
			break;
		case 'stylesheet':
			mode = activeStyleSheet;
			break;
		case 'script':
			mode = activeScript;
			break;
	}

	return (
		<AceEditor
			value={value}
			mode={mode}
			theme='one_dark'
			onChange={handleValueChange}
			showPrintMargin={false}
			wrapEnabled
			enableSnippets
			enableBasicAutocompletion
			tabSize={2}
			placeholder='Happy coding :)'
		/>
	);
};

// <CodeMirror
// 			value={value}
// 			onBeforeChange={(editor, data, value) => {
// 				handleValueChange(value);
// 			}}
// 			onChange={(editor, data, value) => {}}
// 			options={{
// 				lineWrapping: true,
// 				lint: true,
// 				mode: language,
// 				lineNumbers: true,
// 				theme: 'material',
// 				autoCloseBrackets: true,
// 			}}
// 		/>

export default Editor;
