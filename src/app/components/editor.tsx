/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';

// import { Controlled as CodeMirror } from 'react-codemirror2';

import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-one_dark';
import 'ace-builds/src-noconflict/ext-language_tools';
import { useActions } from '../hooks/use-actions';

// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
// import 'codemirror/mode/xml/xml';
// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/mode/css/css';
// import 'codemirror/addon/edit/closebrackets';

interface EditorProps {
	value: string;
	handleValueChange: Function;
	language: string;
}

const Editor: React.FC<EditorProps> = ({
	value,
	handleValueChange,
	language,
}) => {
	const [text, setText] = React.useState('');

	const { updateHTML, updateCSS, updateJavascript } = useActions();

	const onChange = (nText: string) => {
		switch (language) {
			case 'javascript':
				updateJavascript(nText);
				break;
			case 'html':
				updateHTML(nText);
				break;
			case 'css':
				updateCSS(nText);
				break;
			default:
			//do nothing
		}
		setText(nText);
	};

	return (
		<AceEditor
			mode={language}
			theme='one_dark'
			onChange={onChange}
			name='UNIQUE_ID_OF_DIV'
			editorProps={{ $blockScrolling: true }}
			value={text}
			showPrintMargin={false}
			wrapEnabled
			enableLiveAutocompletion
			enableSnippets
			enableBasicAutocompletion
			tabSize={2}
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
