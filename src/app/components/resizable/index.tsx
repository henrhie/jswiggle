/* eslint-disable @typescript-eslint/naming-convention */

import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

import './resizable.css';

interface ResizableProps {
	direction: 'horizontal' | 'vertical';
	children: React.ReactNode;
	initialWidth?: number;
	initialHeight?: number;
}

const Resizable: FC<ResizableProps> = ({
	direction,
	children,
	initialHeight,
	initialWidth,
}) => {
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const [innerHeight, setInnerHeight] = useState(window.innerHeight);
	const [width, setWidth] = useState(window.innerWidth * (initialWidth || 0.5));
	const [height, setHeight] = useState(
		window.innerHeight * (initialHeight || 0.5)
	);

	useEffect(() => {
		let timer: NodeJS.Timeout;

		const listener = () => {
			if (timer) {
				clearTimeout(timer);
			}

			timer = setTimeout(() => {
				setInnerWidth(window.innerWidth);
				setInnerHeight(window.innerHeight);

				if (window.innerWidth * 0.9 < width) {
					setWidth(window.innerWidth * 0.9);
				}
				if (window.innerHeight * 0.9 < height) {
					setHeight(window.innerHeight * 0.9);
				}
			}, 100);
		};

		window.addEventListener('resize', listener);

		return () => window.removeEventListener('resize', listener);
	}, [width, height]);

	let resizableProps: ResizableBoxProps;

	if (direction === 'horizontal') {
		resizableProps = {
			className: 'resize-horizontal',
			minConstraints: [innerWidth * 0.1, Infinity],
			maxConstraints: [innerWidth * 0.9, Infinity],
			height: Infinity,
			width,
			resizeHandles: ['e'],
			onResizeStop: (_event: any, data: any) => {
				setWidth(data.size.width);
			},
		};
	} else {
		resizableProps = {
			minConstraints: [Infinity, innerHeight * 0.1],
			maxConstraints: [Infinity, innerHeight * 0.9],
			height,
			onResizeStop: (_event: any, data: any) => {
				setHeight(data.size.height);
			},
			width: Infinity,
			resizeHandles: ['s'],
		};
	}

	return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
