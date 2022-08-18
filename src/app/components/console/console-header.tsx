/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { SwapSpinner } from 'react-spinners-kit';
import { useActions } from '../../hooks/use-actions';

import { useTypedSelector } from '../../hooks/use-typed-selector';

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

const ConsoleHeader = ({ minimize, setMinimize }) => {
	const { loading } = useTypedSelector(({ execution }) => ({
		loading: execution.loading,
	}));
	const { clearConsole } = useActions();

	return (
		<div className='console-header-wrapper'>
			<div>
				<ConsoleIcon />
			</div>
			<p>console</p>
			<div className='spinner-wrapper'>
				{loading && <SwapSpinner size={22} color='#0066CC' />}
			</div>
			{!minimize && (
				<div className='console-actions'>
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
	);
};

export default ConsoleHeader;
