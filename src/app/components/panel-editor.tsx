/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
// import { useStore } from 'react-redux';
import { Dropdown, DropdownItemProps } from 'semantic-ui-react';
import { useActions } from '../hooks/use-actions';
import Editor from './editor';
// import { IState } from '../redux/reducers';

interface IProps {
	value: string;
	setValue: (v: string, e: Event) => void;
	language: string;
	dispatchGlobalAction?: Function;
	editorType: string;
}

const PanelEditor: React.FC<IProps> = ({
	value,
	setValue,
	language,
	dispatchGlobalAction,
	editorType,
}) => {
	let display_lang: string;

	const { updateMode } = useActions();
	// const store = useStore<IState>();

	let variants: DropdownItemProps[];

	switch (language) {
		case 'html':
			display_lang = 'HTML';
			variants = [{ text: 'HTML', value: 'HTML', key: 'HTML' }];
			break;
		case 'css':
			display_lang = 'CSS';
			variants = [
				{ text: 'CSS', value: 'CSS', key: 'CSS' },
				{ text: 'LESS', value: 'LESS', key: 'LESS' },
				{ text: 'SASS', value: 'SASS', key: 'SASS' },
				{ text: 'SCSS', value: 'SCSS', key: 'SCSS' },
			];
			break;
		case 'javascript':
			display_lang = 'JavaScript';
			variants = [
				{ text: 'JavaScript', value: 'JavaScript', key: 'JavaScript' },
				{ text: 'TypeScript', value: 'TypeScript', key: 'TypeScript' },
				{ text: 'CoffeeScript', value: 'CoffeeScript', key: 'CoffeeScript' },
			];
			break;
		default:
			display_lang = language;
	}

	return (
		<div
			style={{
				height: '100%',
				backgroundColor: '#272c35',
			}}>
			<div
				style={{
					height: '100%',
					backgroundColor: '#272c35',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'stretch',
				}}>
				<div
					style={{
						padding: '5px',
						backgroundColor: '#272c35',
						margin: '8px 6px',
						display: 'flex',
					}}>
					<Dropdown
						inline
						options={variants}
						defaultValue={variants[0].value}
						onChange={(e, { value }) => {
							updateMode(value);
						}}
					/>
				</div>
				<div
					style={{ flexGrow: '1', marginRight: '10px', paddingBottom: '12px' }}>
					<Editor
						language={language}
						value={value}
						handleValueChange={setValue}
						editorType={editorType}
					/>
				</div>
			</div>
		</div>
	);
};

export default React.memo(PanelEditor);
