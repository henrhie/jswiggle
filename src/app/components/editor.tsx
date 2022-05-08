/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';

import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/addon/edit/closebrackets';

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
	return (
		<CodeMirror
			value={value}
			onBeforeChange={(editor, data, value) => {
				handleValueChange(value);
			}}
			onChange={(editor, data, value) => {}}
			options={{
				lineWrapping: true,
				lint: true,
				mode: language,
				lineNumbers: true,
				theme: 'material',
				autoCloseBrackets: true,
			}}
		/>
	);
};

export default Editor;
