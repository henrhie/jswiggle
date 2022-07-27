/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { useStore } from 'react-redux';
import { Dropdown, DropdownItemProps } from 'semantic-ui-react';
import { useActions } from '../hooks/use-actions';
import { reducer } from '../redux/reducer';
import Editor from './editor';

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
	const testJs = language === 'javascript';

	const { startBundle, updateMode } = useActions();
	const store = useStore<ReturnType<typeof reducer>>();

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

	const runProcess = () => {
		dispatchGlobalAction();
		startBundle(store.getState());
	};

	React.useLayoutEffect(() => {
		const innerLineLeft = document.createElement('div');
		const innerLineRight = document.createElement('div');
		const centerLine = document.createElement('div');
		innerLineLeft.className = 'inner_line';
		innerLineRight.className = 'inner_line';
		centerLine.className = 'center_line';
		const s_handles = document.querySelectorAll('.react-resizable-handle-s');
		if (!s_handles[0].hasChildNodes()) {
			s_handles[0].appendChild(innerLineLeft);
			s_handles[1].appendChild(innerLineRight);
		}

		const centerLine_ = document.querySelector('.react-resizable-handle-e');
		if (!centerLine_.hasChildNodes()) {
			centerLine_.appendChild(centerLine);
		}
	});

	return (
		<div
			style={{
				height: '100%',
				backgroundColor: '#272c35',
			}}
		>
			<div
				style={{
					height: '100%',
					backgroundColor: '#272c35',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'stretch',
				}}
			>
				<div
					style={{
						padding: '5px',
						backgroundColor: '#272c35',
						margin: '8px 6px',
						display: 'flex',
					}}
				>
					{/* <p
						style={{
							margin: '0',
							marginBottom: '0px',
							marginLeft: '4px',
							color: '#fff',
							fontFamily: 'inter-regular',
							fontWeight: 'lighter',
						}}
					>
						{display_lang}
					</p> */}
					<Dropdown
						inline
						options={variants}
						defaultValue={variants[0].value}
						onChange={(e, { value }) => {
							updateMode(value);
						}}
					/>
					{testJs && (
						<div
							style={{
								marginLeft: 'auto',
								marginRight: '10px',
								padding: '3px 12px',
							}}
							className='run-wrapper'
							onClick={() => runProcess()}
						>
							<p
								style={{
									color: 'white',
									margin: 0,
									fontFamily: 'inter-regular',
								}}
							>
								Run
							</p>
							{/* <img src='../assets/svg/play.svg' /> */}
						</div>
					)}
				</div>
				<div style={{ flexGrow: '1' }}>
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
