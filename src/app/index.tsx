/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { render } from 'react-dom';
import { Provider, useStore } from 'react-redux';

import Console from './components/console';
import 'semantic-ui-css/semantic.min.css';

import Panel from './components/panel';
import PanelEditor from './components/panel-editor';
import Preview from './components/preview';
import Resizable from './components/resizable';
import { useActions } from './hooks/use-actions';
import { useTypedSelector } from './hooks/use-typed-selector';
import FlashIcon from 'jsx:./assets/svg/flash.svg';
import ShareIcon from 'jsx:./assets/svg/share.svg';
import ForkIcon from 'jsx:./assets/svg/hierarchy.svg';

import './index.css';
import { store } from './redux/store';
import { IState } from './redux';

const HeaderItem = ({ text, Icon, handleClick }) => {
	return (
		<div
			onClick={handleClick}
			className='header-item'
			style={{
				height: '100%',
				padding: '0 12px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'row',
			}}>
			<Icon />
			<p style={{ color: '#fff', marginLeft: '6px' }}>{text}</p>
		</div>
	);
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const App = () => {
	const [script_, setScript_] = React.useState('');
	const [markdown_, setMarkdown_] = React.useState('');
	const [stylesheet_, setStylesheet_] = React.useState('');
	const counter = React.useRef(0);
	const previewRef = React.useRef(null);

	const { updateMarkdown, updateScript, updateStylesheet, startBundle } =
		useActions();
	let { bundle, markdown } = useTypedSelector(({ code, execution }) => ({
		bundle: execution.bundle,
		markdown: code.markdown,
		loading: execution.loading,
	}));

	const store = useStore<IState>();

	const updateCodeStore = () => {
		updateMarkdown(markdown_);
		updateStylesheet(stylesheet_);
		updateScript(script_);
		counter.current += 1;
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
			<header
				style={{
					height: '40px',
					display: 'flex',
					backgroundColor: '#242931',
					paddingLeft: '12px',
				}}>
				<HeaderItem
					text='Run'
					Icon={FlashIcon}
					handleClick={() => {
						updateCodeStore();
						startBundle(store.getState());
					}}
				/>
				<HeaderItem text='Fork' Icon={ForkIcon} handleClick={() => {}} />
				<HeaderItem
					text='Collaborate'
					Icon={ShareIcon}
					handleClick={() => {}}
				/>
			</header>
			<div
				style={{
					display: 'flex',
					height: 'calc(100vh - 40px)',
				}}>
				<Resizable direction='horizontal'>
					<Panel width='100%'>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								height: '100%',
							}}>
							<Resizable direction='vertical'>
								<Panel height='100%' color='purple'>
									<PanelEditor
										value={markdown_}
										setValue={setMarkdown_}
										language='html'
										editorType='markdown'
									/>
								</Panel>
							</Resizable>
							<div style={{ flexGrow: 1 }}>
								<Panel height='100%'>
									<PanelEditor
										value={script_}
										setValue={setScript_}
										language='javascript'
										dispatchGlobalAction={updateCodeStore}
										editorType='script'
									/>
								</Panel>
							</div>
						</div>
					</Panel>
				</Resizable>

				<div style={{ flexGrow: 1 }}>
					<Panel width='100%' flexGrow={1} height='calc(100vh - 40px)'>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								height: '100%',
							}}>
							<Resizable direction='vertical' initialHeight={0.33}>
								<Panel height='100%'>
									<PanelEditor
										setValue={setStylesheet_}
										value={stylesheet_}
										language='css'
										editorType='stylesheet'
									/>
								</Panel>
							</Resizable>
							<div
								style={{
									flexGrow: 1,
									paddingBottom: '0',
									overflow: 'hidden',
								}}>
								<Panel height='100%'>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											height: '100%',
										}}>
										<Preview
											code={bundle}
											htmlExt={markdown}
											ref={previewRef}
										/>
										<Console />
									</div>
								</Panel>
							</div>
						</div>
					</Panel>
				</div>
			</div>
		</div>
	);
};

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
