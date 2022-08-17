/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import Editor, { EditorDidMount } from '@monaco-editor/react';
import './editor.css';
// import * as draculaTheme from 'monaco-themes/themes/Dracula.json';
import { useTypedSelector } from '../../hooks/use-typed-selector';

const CodeEditor = ({ value, handleValueChange, editorType }) => {
	const editorRef = React.useRef<any>();
	const { activeMarkdown, activeScript, activeStyleSheet } = useTypedSelector(
		({ mode: { activeMarkdown, activeScript, activeStyleSheet } }) => {
			return {
				activeMarkdown,
				activeScript,
				activeStyleSheet,
			};
		}
	);
	const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
		editorRef.current = monacoEditor;
		monacoEditor.onDidChangeModelContent(() => {
			handleValueChange(getValue());
		});

		// monaco
		// 	.init()
		// 	.then((monaco) => {
		// 		monaco.editor.defineTheme('Dracula', draculaTheme as any);
		// 		monaco.editor.setTheme('Dracula');
		// 	})
		// 	.catch((error) =>
		// 		console.error(
		// 			'An error occurred during initialization of Monaco: ',
		// 			error
		// 		)
		// 	);

		// if (editorType === 'script') {
		// 	editorRef.current.languages.typescript.javascriptDefaults.setCompilerOptions(
		// 		{
		// 			allowNonTsExtensions: true,
		// 		}
		// 	);
		// }

		monacoEditor.getModel()?.updateOptions({ tabSize: 4 });

		// const highlighter = new Highlighter(
		// 	// @ts-ignore
		// 	window.monaco,
		// 	codeShift,
		// 	monacoEditor
		// );
		// highlighter.highLightOnDidChangeModelContent(
		// 	() => {},
		// 	() => {},
		// 	undefined,
		// 	() => {}
		// );
	};
	React.useEffect(() => {}, []);
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
		<Editor
			editorDidMount={onEditorDidMount}
			value={value}
			language={mode}
			height='100%'
			theme='dark'
			options={{
				wordWrap: 'on',
				minimap: { enabled: false },
				showUnused: true,
				folding: false,
				lineNumbersMinChars: 3,
				fontSize: 13,
				scrollBeyondLastLine: true,
				automaticLayout: true,
				fixedOverflowWidgets: true,
				fontFamily: 'fira-regular',
			}}
		/>
	);
};

export default CodeEditor;
