/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';

const HeaderItem = ({ text, Icon, handleClick }) => {
	return (
		<div onClick={handleClick} className='header-item' style={{}}>
			<Icon />
			<p style={{ color: '#adbac7', marginLeft: '6px', fontSize: '12px' }}>
				{text}
			</p>
		</div>
	);
};

export default HeaderItem;
