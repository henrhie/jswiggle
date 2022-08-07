/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';

import Console from '../console';
import 'semantic-ui-css/semantic.min.css';

import Panel from '../panel';
import PanelEditor from '../panel-editor';
import Preview from '../preview';
import Resizable from '../resizable';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';

import '../index.css';
import './layout.css';

import Header from '../header';

// eslint-disable-next-line @typescript-eslint/naming-convention
const Layout = () => {
	const [script_, setScript_] = React.useState('');
	const [markdown_, setMarkdown_] = React.useState('');
	const [stylesheet_, setStylesheet_] = React.useState('');
	const counter = React.useRef(0);
	const previewRef = React.useRef(null);

	const { updateMarkdown, updateScript, updateStylesheet } = useActions();
	let { bundle, markdown } = useTypedSelector(({ code, execution }) => ({
		bundle: execution.bundle,
		markdown: code.markdown,
		loading: execution.loading,
	}));

	const updateCodeStore = () => {
		updateMarkdown(markdown_);
		updateStylesheet(stylesheet_);
		updateScript(script_);
		counter.current += 1;
	};

	const resetPreviewContent = () => {
		updateMarkdown('');
	};

	return (
		<div className='layout'>
			<Header
				updateCodeStore={updateCodeStore}
				resetPreviewContent={resetPreviewContent}
			/>
			<div>
				<Resizable direction='horizontal'>
					<Panel width='100%'>
						<div className='layout-vertical-wrapper'>
							<Resizable direction='vertical'>
								<Panel height='100%' color='purple'>
									<PanelEditor
										value={markdown_}
										setValue={setMarkdown_}
										language='html'
										editorType='markdown'
									/>
								</Panel>
							</Resizable>
							<div style={{ flexGrow: 1 }}>
								<Panel height='100%'>
									<PanelEditor
										value={script_}
										setValue={setScript_}
										language='javascript'
										editorType='script'
									/>
								</Panel>
							</div>
						</div>
					</Panel>
				</Resizable>

				<div style={{ flexGrow: 1 }}>
					<Panel width='100%' flexGrow={1} height='calc(100vh - 50px)'>
						<div className='layout-vertical-wrapper'>
							<Resizable direction='vertical' initialHeight={0.33}>
								<Panel height='100%'>
									<PanelEditor
										setValue={setStylesheet_}
										value={stylesheet_}
										language='css'
										editorType='stylesheet'
									/>
								</Panel>
							</Resizable>
							<div className='preview-panel-wrapper'>
								<Panel height='100%'>
									<div className='layout-vertical-wrapper'>
										<Preview
											code={bundle}
											htmlExt={markdown}
											ref={previewRef}
										/>
										<Console />
									</div>
								</Panel>
							</div>
						</div>
					</Panel>
				</div>
			</div>
		</div>
	);
};

export default Layout;
