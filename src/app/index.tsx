import * as React from 'react';
import { render } from 'react-dom';
// import Editor from './components/editor';
import { Provider } from 'react-redux';
import Console from './components/console';

import Panel from './components/panel';
import PanelEditor from './components/panel-editor';
import Preview from './components/preview';
import Resizable from './components/resizable';

import './index.css';
import { store } from './redux/store';

// eslint-disable-next-line @typescript-eslint/naming-convention
const App = () => {
	const [jsValue, setJsValue] = React.useState('');
	const [htmlValue, setHtmlValue] = React.useState('');
	const [cssValue, setCssValue] = React.useState('');

	return (
		<div style={{ display: 'flex' }}>
			<Resizable direction='horizontal'>
				<Panel width='100%' height='100vh'>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							height: '100%',
						}}>
						<Resizable direction='vertical'>
							<Panel height='calc(100% - 3px)' color='purple'>
								<PanelEditor
									value={htmlValue}
									setValue={setHtmlValue}
									language='html'
								/>
							</Panel>
						</Resizable>
						<div style={{ flexGrow: 1 }}>
							<Panel height='100%'>
								<PanelEditor
									value={jsValue}
									setValue={setJsValue}
									language='javascript'
								/>
							</Panel>
						</div>
					</div>
				</Panel>
			</Resizable>

			<div style={{ flexGrow: 1 }}>
				<Panel width='100%' flexGrow={1} height='100vh'>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							height: '100%',
						}}>
						<Resizable direction='vertical'>
							<Panel height='calc(100% - 3px)'>
								<PanelEditor
									setValue={setCssValue}
									value={cssValue}
									language='css'
								/>
							</Panel>
						</Resizable>
						<div style={{ flexGrow: 1, padding: '4px 0', paddingBottom: '0' }}>
							<Panel height='100%'>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										height: '100%',
										border: '0.1px solid #39464e',
									}}>
									<Preview code='' />
									<Console />
								</div>
							</Panel>
						</div>
					</div>
				</Panel>
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
