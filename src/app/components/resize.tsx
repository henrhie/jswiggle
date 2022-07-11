/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { Resizable } from 're-resizable';

interface ResizeProps {
	children: React.ReactNode;
	direction: 'vertical' | 'horizontal';
}

const Resize: React.FC<Partial<ResizeProps>> = ({ direction, children }) => {
	return (
		<Resizable
			defaultSize={{
				width: window.innerHeight * 0.5,
				height: window.innerWidth * 0.5,
			}}>
			{children}
		</Resizable>
	);
};

export default Resize;
