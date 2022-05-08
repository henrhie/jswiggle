/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import Panel from './panel';
import Resizable from './resizable';

const ResizableVerticalPanel = () => {
	return (
		<Resizable direction='horizontal'>
			<Panel width='100%' height='100vh'>
				<div
					style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
					<Resizable direction='vertical'>
						<Panel height='calc(100% - 10px)' color='purple' />
					</Resizable>
					<div style={{ flexGrow: 1 }}>
						<Panel color='green' height='100%' />
					</div>
				</div>
			</Panel>
		</Resizable>
	);
};

export default ResizableVerticalPanel;
