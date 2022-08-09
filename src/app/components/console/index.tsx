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
	const prevInputs = React.useRef<any[]>([]);
	const prevInputsTracker = React.useRef(prevInputs.current.length);
	const inputRef = React.useRef();

	const { logs } = useTypedSelector(({ execution: { logs, loading } }) => ({
		logs,
		loading,
	}));
	const { clearConsole, runConsoleInput } = useActions();

	const handleKeyDownEvent = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			if (inputState === prevInputs.current[prevInputsTracker.current]) {
				prevInputs.current.splice(prevInputsTracker.current, 1);
			}
			prevInputs.current.push(inputState);
			prevInputsTracker.current = prevInputs.current.length;
			if (inputState === 'clear') {
				clearConsole();
				setInputState('');
				return;
			}
			runConsoleInput(inputState);
			setInputState('');
			return;
		}
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (prevInputsTracker.current <= 0) {
				return;
			}
			prevInputsTracker.current -= 1;
			setInputState(prevInputs.current[prevInputsTracker.current]);
			return;
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (prevInputsTracker.current === prevInputs.current.length - 1) {
				prevInputsTracker.current += 1;
				setInputState('');
			} else if (prevInputsTracker.current < prevInputs.current.length - 1) {
				prevInputsTracker.current += 1;
				setInputState(prevInputs.current[prevInputsTracker.current]);
			}
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
							onKeyDown={handleKeyDownEvent}
							value={inputState}
							onChange={(e) => setInputState(e.target.value)}
							ref={inputRef}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default Console;
