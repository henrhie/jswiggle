/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { render } from 'react-dom';
import { Provider, useStore } from 'react-redux';
import { SwapSpinner } from 'react-spinners-kit';

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
			<p style={{ color: '#0066CC', marginLeft: '6px' }}>{text}</p>
		</div>
	);
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const App = () => {
	const [jsValue, setJsValue] = React.useState('');
	const [htmlValue, setHtmlValue] = React.useState('');
	const [cssValue, setCssValue] = React.useState('');
	const counter = React.useRef(0);
	const previewRef = React.useRef(null);

	const { updateCSS, updateHTML, updateJavascript, startBundle } = useActions();
	let { bundle, _html, loading } = useTypedSelector(
		({ bundle, _html, loading }) => ({
			bundle,
			_html,
			loading,
		})
	);

	const store = useStore();

	const dispatchGlobalAction_ = () => {
		updateHTML(htmlValue);
		updateCSS(cssValue);
		updateJavascript(jsValue);
		counter.current += 1;
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
			<header
				style={{
					height: '40px',
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
					backgroundColor: '#1C1F25',
				}}>
				<HeaderItem
					text='Run'
					Icon={FlashIcon}
					handleClick={() => {
						dispatchGlobalAction_();
						startBundle(store.getState());
					}}
				/>
				<HeaderItem text='Fork' Icon={ForkIcon} handleClick={() => {}} />
				<HeaderItem
					text='Collaborate'
					Icon={ShareIcon}
					handleClick={() => {}}
				/>
				<div style={{ marginLeft: 'auto', marginRight: '12px' }}>
					{loading && <SwapSpinner size={22} color='#0066CC' />}
				</div>
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
										value={htmlValue}
										setValue={setHtmlValue}
										language='html'
										editorType='markdown'
									/>
								</Panel>
							</Resizable>
							<div style={{ flexGrow: 1 }}>
								<Panel height='100%'>
									<PanelEditor
										value={jsValue}
										setValue={setJsValue}
										language='javascript'
										dispatchGlobalAction={dispatchGlobalAction_}
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
										setValue={setCssValue}
										value={cssValue}
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
										<Preview code={bundle} htmlExt={_html} ref={previewRef} />
										<Console previewRef={previewRef} />
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
