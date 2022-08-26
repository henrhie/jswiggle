/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';

import Console from '../console';
import 'semantic-ui-css/semantic.min.css';

import Panel from '../panel';
import PanelEditor from '../panel-editor';
import Preview from '../preview';
import Resizable from '../resizable';
import { useActions } from '../../hooks/use-actions';

import '../index.css';
import './layout.css';

import Header from '../header';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { prettify } from './prettify';
import { useStore } from 'react-redux';
import { IState } from '../../redux';

// eslint-disable-next-line @typescript-eslint/naming-convention
const Layout = () => {
	const [script_, setScript_] = React.useState('');
	const [markdown_, setMarkdown_] = React.useState('');
	const [stylesheet_, setStylesheet_] = React.useState('');
	const counter = React.useRef(0);

	const {
		updateMarkdown,
		updateScript,
		updateStylesheet,
		clearBundle,
		startBundle,
	} = useActions();

	const store = useStore<IState>();

	const updateCodeStore = () => {
		updateMarkdown(markdown_);
		updateStylesheet(stylesheet_);
		updateScript(script_);
		counter.current += 1;
	};

	const mode = useTypedSelector(({ mode }) => {
		return mode;
	});

	const resetPreviewContent = () => {
		updateMarkdown('');
		clearBundle();
	};

	const prettify_ = () => {
		const { formattedMarkdown, formattedStyleSheet, formattedScript } =
			prettify(markdown_, stylesheet_, script_, mode);

		setMarkdown_(formattedMarkdown);
		setStylesheet_(formattedStyleSheet);
		setScript_(formattedScript);
	};

	const keyHandler = ({ repeat, metaKey, ctrlKey, key }) => {
		if (repeat) {
			return;
		}

		if ((metaKey || ctrlKey) && key === 'Enter') {
			updateCodeStore();
			startBundle(store.getState());
		}
	};
	React.useEffect(() => {
		document.addEventListener('keydown', keyHandler);
		return () => document.removeEventListener('keydown', keyHandler);
	}, [keyHandler]);

	return (
		<div className='layout'>
			<Header
				updateCodeStore={updateCodeStore}
				resetPreviewContent={resetPreviewContent}
				prettify={prettify_}
			/>
			<div>
				<Resizable direction='horizontal'>
					<Panel width='calc(100% - 1px)'>
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
							<div style={{ flexGrow: 1, overflow: 'hidden' }}>
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

				<div style={{ flexGrow: 1, overflow: 'hidden' }}>
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
										<Preview />
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
