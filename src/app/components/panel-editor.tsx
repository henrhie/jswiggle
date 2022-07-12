/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { useStore } from 'react-redux';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { reducer } from '../redux/reducer';
import Editor from './editor';

const PanelEditor = ({ value, setValue, language }) => {
	let display_lang: string;
	const testJs = language === 'javascript';

	const { startBundle } = useActions();
	const store = useStore<ReturnType<typeof reducer>>();

	const bundle = useTypedSelector((state) => state.bundle);
	console.log('bundle: ', bundle);

	switch (language) {
		case 'html':
			display_lang = 'HTML';
			break;
		case 'css':
			display_lang = 'CSS';
			break;
		case 'javascript':
			display_lang = 'Javascript';
			break;
		default:
			display_lang = language;
	}

	const runProcess = () => {
		startBundle(store.getState());
		console.log('state: ', store.getState());
		console.log('store: ', store.getState());
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
			}}>
			<div
				style={{
					height: '100%',
					// padding: '0.5rem 0.7rem',
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
					<p
						style={{
							margin: '0',
							marginBottom: '0px',
							marginLeft: '4px',
							color: '#fff',
							fontFamily: 'hack-regular',
						}}>
						{display_lang}
					</p>
					{testJs && (
						<div style={{ marginLeft: 'auto', marginRight: '10px' }}>
							<p
								className='run-action'
								onClick={() => runProcess()}
								style={{ color: 'white', margin: 0 }}>
								Run
							</p>
						</div>
					)}
				</div>
				<div style={{ flexGrow: '1' }}>
					<Editor
						language={language}
						value={value}
						handleValueChange={setValue}
					/>
				</div>
			</div>
		</div>
	);
};

export default PanelEditor;
