/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { SwapSpinner } from 'react-spinners-kit';

const _ConsoleOutputCell_ = ({ logs }) => {
	const { clearLogsFromInput } = useActions();
	return logs.map((log: any, i: number) => {
		let _log: any;
		switch (log.type && typeof log.payload) {
			case 'loading' && 'string':
				_log = `"${log.payload}"`;
				break;
			case 'iframe_output' && 'string':
				_log = `"${log.payload}"`;
				break;
			case 'iframe_output' && 'object':
				_log = JSON.stringify(log.payload);
				break;
			case 'err_output' && 'string':
				_log = log.payload;
				break;
			default:
				_log = log.payload;
		}
		clearLogsFromInput();

		let color: string;
		switch (log.type) {
			case 'loading':
				color = '#1363DF';
				break;
			case 'err_output':
				color = '#D61C4E';
				break;
			default:
				color = '#ffffff';
		}

		return (
			<li
				key={`${i}${log}`}
				style={{
					width: '100%',
					color,
					fontSize: '11px',
					backgroundColor: log.type === 'err_output' ? '#3B2931' : '',
				}}>
				<span>{_log}</span>
			</li>
		);
	});
};

const ConsoleOutputCell = React.memo(_ConsoleOutputCell_);

const ConsoleIcon: React.FC = () => {
	return (
		<svg height='16' version='1.1' viewBox='0 0 24 24' stroke='#4b4d51'>
			<g
				stroke-linecap='round'
				stroke-width='1.8'
				fill='none'
				stroke-linejoin='round'>
				<polyline points='4,17 10,11 4,5'></polyline>
				<line x1='12' x2='20' y1='19' y2='19'></line>
			</g>
		</svg>
	);
};

const Console = () => {
	const [minimize, setMinimize] = React.useState(false);
	const [inputState, setInputState] = React.useState('');

	const { logs, loading } = useTypedSelector(({ execution }) => ({
		logs: execution.logs,
		loading: execution.loading,
	}));
	const { clearConsole, runConsoleInput } = useActions();

	const handleEnterKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			if (inputState === 'clear') {
				clearConsole();
				setInputState('');
				return;
			}
			runConsoleInput(inputState);
			setInputState('');
		}
	};

	React.useLayoutEffect(() => {
		const consoleBody = document.querySelector('#outer-console');
		consoleBody.scrollTop = consoleBody.scrollHeight - consoleBody.clientHeight;
	});

	return (
		<div
			className={minimize ? 'minimize-console' : 'console'}
			id='outer-console'
			onClick={() => {
				if (!minimize) {
					return;
				}
				setMinimize(!minimize);
			}}
			style={{ backgroundColor: '#272c35' }}>
			<div
				className='console-header-wrapper'
				style={{
					width: 'calc(100%-2px)',
					backgroundColor: '#272c35',
					display: 'flex',
					position: 'sticky',
					borderBottom: '1px solid #39464e',
					borderTop: '1px solid #39464e',
					top: 0,
					left: 0,
				}}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginLeft: '8px',
					}}>
					<ConsoleIcon />
				</div>

				<p
					style={{
						marginLeft: '8px',
						marginTop: '10px',
						marginBottom: '10px',
					}}>
					console
				</p>
				<div
					style={{
						marginLeft: '12px',
						marginRight: '12px',
						display: 'flex',
						alignItems: 'center',
						marginBottom: '4px',
					}}>
					{loading && <SwapSpinner size={22} color='#0066CC' />}
				</div>
				{!minimize && (
					<div
						className='console-actions'
						style={{
							marginLeft: 'auto',
							marginRight: '8px',
							display: 'flex',
							alignItems: 'center',
						}}>
						<p style={{ marginRight: '6px' }} onClick={() => clearConsole()}>
							Clear Console
						</p>
						<p
							style={{ marginBottom: '0' }}
							onClick={() => setMinimize(!minimize)}>
							Minimize
						</p>
					</div>
				)}
			</div>
			{!minimize && (
				<>
					<ul
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							overflow: 'hidden',
							padding: 0,
							// height: 'calc(100% - 32px)',
						}}>
						<ConsoleOutputCell logs={logs} />
					</ul>
					<div
						style={{
							height: '32px',
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: '#141619',
							position: 'sticky',
							bottom: 0,
							left: 0,
						}}>
						<input
							style={{ height: '67%', width: '95%' }}
							className='console-input'
							placeholder='>_'
							autoFocus={true}
							onKeyDown={handleEnterKeyPress}
							value={inputState}
							onChange={(e) => setInputState(e.target.value)}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default Console;
