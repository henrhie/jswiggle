/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { useActions } from '../../hooks/use-actions';

const ConsoleOutput = ({ logs }) => {
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
				color = '#fff';
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
				}}
			>
				<span>{_log}</span>
			</li>
		);
	});
};

export default React.memo(ConsoleOutput);
