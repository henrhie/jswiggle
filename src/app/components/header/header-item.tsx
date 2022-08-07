/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';

const HeaderItem: React.FC<{
	text: string;
	Icon: React.JSXElementConstructor<any>;
	handleClick: React.MouseEventHandler;
	isRunBtn?: boolean;
}> = ({ text, Icon, handleClick, isRunBtn }) => {
	return (
		<div
			onClick={handleClick}
			className='header-item'
			style={{ backgroundColor: isRunBtn ? '#6A67CE' : '' }}>
			<Icon />
			<p style={{ color: '#fff', marginLeft: '6px', fontSize: '14px' }}>
				{text}
			</p>
		</div>
	);
};

export default HeaderItem;
