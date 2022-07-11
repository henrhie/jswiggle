/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';

const ConsoleIcon = () => {
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

const Console: React.FC = () => {
	const [minimize, setMinimize] = React.useState(false);

	return (
		<div
			className={minimize ? 'minimize-console' : 'console'}
			onClick={() => {
				if (!minimize) {
					return;
				}
				setMinimize(!minimize);
			}}>
			<div
				className='console-header-wrapper'
				style={{
					width: 'calc(100%-2px)',
					backgroundColor: '#272c35',
					display: 'flex',
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

				<p style={{ marginLeft: '8px' }}>console</p>
				{!minimize && (
					<div
						className='console-actions'
						style={{ marginLeft: 'auto', marginRight: '8px', display: 'flex' }}>
						<p style={{ marginRight: '6px' }}>Clear Console</p>
						<p onClick={() => setMinimize(!minimize)}>Minimize</p>
					</div>
				)}
			</div>
			{!minimize && (
				<div
					style={{
						height: '32px',
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#141619',
					}}>
					<input
						style={{ height: '67%', width: '95%' }}
						className='console-input'
						placeholder='>_'
						autoFocus={true}
						// onBlur={({ target }) => target.focus()}
					/>
				</div>
			)}
		</div>
	);
};

export default Console;
