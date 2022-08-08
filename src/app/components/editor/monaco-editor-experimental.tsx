/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';

const Editor = () => {
	return (
		<MonacoEditor
			// editorDidMount={onEditorDidMount}
			// value={initialValue}
			language='javascript'
			height='100%'
			theme='dark'
			options={{
				wordWrap: 'on',
				minimap: { enabled: false },
				showUnused: false,
				folding: false,
				lineNumbersMinChars: 3,
				fontSize: 16,
				scrollBeyondLastLine: false,
				automaticLayout: true,
			}}
		/>
	);
};

export default Editor;
