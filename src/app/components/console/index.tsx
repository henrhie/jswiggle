/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import ConsoleHeader from './console-header';

import ConsoleOutput from './console-output';

import './console.css';

const Console = () => {
	const [minimize, setMinimize] = React.useState(false);
	const [inputState, setInputState] = React.useState('');

	const { logs } = useTypedSelector(({ execution }) => ({
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
			style={{ backgroundColor: '#272c35' }}
		>
			<ConsoleHeader minimize={minimize} setMinimize={setMinimize} />

			{!minimize && (
				<>
					<ul
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							overflow: 'hidden',
							padding: 0,
						}}
					>
						<ConsoleOutput logs={logs} />
					</ul>
					<div className='console-input-wrapper'>
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
