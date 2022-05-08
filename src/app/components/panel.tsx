/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';

interface IPanel {
	width: string;
	height: string;
	children: React.ReactNode;
	flexGrow: number;
	color: string;
}

const Panel: React.FC<Partial<IPanel>> = ({
	width,
	height,
	children,
	flexGrow,
	color,
}) => {
	return (
		<div
			style={{
				height,
				width,
				backgroundColor: color,
				flexGrow,
			}}>
			{children}
		</div>
	);
};

export default Panel;
