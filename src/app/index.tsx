import * as React from 'react';
import { render } from 'react-dom';
import Editor from './components/editor';

import Panel from './components/panel';
import Resizable from './components/resizable';

import './index.css';

// eslint-disable-next-line @typescript-eslint/naming-convention
const App = () => {
	const [jsValue, setJsValue] = React.useState('');

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
							<Panel height='calc(100% - 10px)' color='purple' />
						</Resizable>
						<div style={{ flexGrow: 1 }}>
							<Panel height='calc(100% - 3.5rem)'>
								<div
									style={{
										height: '100%',
										backgroundColor: '#141E27',
									}}>
									<div
										style={{
											display: 'flex',
											height: '2.5rem',
											backgroundColor: '#141E27',
											alignItems: 'flex-end',
											margin: '0 0.5rem',
										}}>
										<div
											style={{
												backgroundColor: '#263238',
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												height: '80%',
												padding: '0 0.6rem',
												borderTopRightRadius: '4px',
												borderTopLeftRadius: '4px',
												// boxShadow: '-6px -7px 10px 1px rgba(0, 0, 0, 0.25)',
											}}>
											<p
												style={{
													fontFamily: 'ibm-plex-regular',
													color: '#fff',
												}}>
												Javascript
											</p>
										</div>
									</div>
									<div
										style={{
											height: '100%',
											backgroundColor: '#263238',
											padding: '0.5rem 0.7rem',
											boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, 0.25)',
										}}>
										<Editor
											language='javascript'
											value={jsValue}
											handleValueChange={setJsValue}
										/>
									</div>
								</div>
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
							<Panel height='calc(100% - 10px)' color='yellow' />
						</Resizable>
						<div style={{ flexGrow: 1 }}>
							<Panel color='red' height='100%' />
						</div>
					</div>
				</Panel>
			</div>
		</div>
	);
};

render(<App />, document.querySelector('#root'));
