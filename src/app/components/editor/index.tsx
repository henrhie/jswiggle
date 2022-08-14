/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
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
import 'ace-builds/src-noconflict/ext-error_marker';
import 'ace-builds/src-noconflict/ext-spellcheck';

import 'ace-builds/src-noconflict/worker-javascript.js';

import 'ace-builds/src-noconflict/snippets/javascript';
import 'ace-builds/src-noconflict/snippets/css';
import 'ace-builds/src-noconflict/snippets/html';
import 'ace-builds/src-noconflict/snippets/typescript';
import 'ace-builds/src-noconflict/snippets/coffee';
import 'ace-builds/src-noconflict/snippets/less';
import 'ace-builds/src-noconflict/snippets/sass';

import 'ace-builds/src-noconflict/ext-error_marker';

import { useTypedSelector } from '../../hooks/use-typed-selector';
import './editor.css';

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
		({ mode: { activeMarkdown, activeScript, activeStyleSheet } }) => {
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
			enableLiveAutocompletion
			tabSize={2}
			editorProps={{ $blockScrolling: true }}
			setOptions={{
				useWorker: true,
			}}
		/>
	);
};

export default Editor;
