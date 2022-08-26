/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { Dropdown, DropdownItemProps } from 'semantic-ui-react';
import { useActions } from '../../hooks/use-actions';
// import Editor from '../editor';

import './panel-editor.css';
import Editor from '../editor/monaco-editor-experimental';

interface IProps {
	value: string;
	setValue: (v: string, e: Event) => void;
	language: string;
	editorType: string;
}

const PanelEditor: React.FC<IProps> = ({
	value,
	setValue,
	language,
	editorType,
}) => {
	const { updateMode, updateJsxFactory } = useActions();

	let variants: DropdownItemProps[];

	switch (language) {
		case 'html':
			variants = [{ text: 'HTML', value: 'HTML', key: 'HTML' }];
			break;
		case 'css':
			variants = [
				{ text: 'CSS', value: 'CSS', key: 'CSS' },
				{ text: 'LESS', value: 'LESS', key: 'LESS' },
				// { text: 'SASS', value: 'SASS', key: 'SASS' },
				{ text: 'SCSS', value: 'SCSS', key: 'SCSS' },
			];
			break;
		case 'javascript':
			variants = [
				{ text: 'JavaScript', value: 'JavaScript', key: 'JavaScript' },
				{ text: 'TypeScript', value: 'TypeScript', key: 'TypeScript' },
				{ text: 'CoffeeScript', value: 'CoffeeScript', key: 'CoffeeScript' },
			];
			break;
		default:
	}

	const jsLibs = [
		{ text: 'pure JS', value: 'PureJs', key: 'PureJs' },
		{ text: 'React', value: 'React', key: 'React' },
		{ text: 'Preact', value: 'Preact', key: 'Preact' },
	];

	return (
		<div className='panel-editor'>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div className='dropdown-wrapper'>
					<Dropdown
						inline
						options={variants}
						defaultValue={variants[0].value}
						onChange={(e, { value }) => {
							updateMode(value);
						}}
					/>
					{editorType === 'script' && (
						<div style={{ marginLeft: 'auto', marginRight: '30px' }}>
							<Dropdown
								inline
								options={jsLibs}
								defaultValue={jsLibs[0].value}
								onChange={(e, { value }) => {
									updateJsxFactory(value as string);
								}}
							/>
						</div>
					)}
				</div>
				<div className='editor-wrapper'>
					<Editor
						value={value}
						handleValueChange={setValue}
						editorType={editorType}
					/>
					{/* <MonacoEditor /> */}
				</div>
			</div>
		</div>
	);
};

export default PanelEditor;
