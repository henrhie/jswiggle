/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import HeaderItem from './header-item';
import FlashIcon from 'jsx:../../assets/svg/flash.svg';
import MainIcon from 'jsx:../../assets/svg/main-icon.svg';
import TextAlign from 'jsx:../../assets/svg/textalign-left.svg';
import Refresh from 'jsx:../../assets/svg/refresh.svg';
import Danger from 'jsx:../../assets/svg/danger.svg';
import { useActions } from '../../hooks/use-actions';
import { useStore } from 'react-redux';
import { IState } from '../../redux';

import './header.css';

const FiddleIcon = () => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				position: 'absolute',
				left: '18px',
			}}>
			<MainIcon />
		</div>
	);
};

const Header = ({ updateCodeStore, resetPreviewContent, prettify }) => {
	const { startBundle } = useActions();
	const store = useStore<IState>();

	return (
		<header>
			<FiddleIcon />
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<HeaderItem
					text='Run'
					Icon={FlashIcon}
					handleClick={() => {
						updateCodeStore();
						startBundle(store.getState());
					}}
					isRunBtn
				/>
				<HeaderItem
					text='Reset Preview'
					Icon={Refresh}
					handleClick={resetPreviewContent}
				/>
				<HeaderItem
					text='Prettify'
					Icon={TextAlign}
					handleClick={async () => await prettify()}
				/>
				<HeaderItem
					text='Report issue'
					Icon={Danger}
					handleClick={() => {
						window
							.open('https://github.com/henrhie/jswiggle/issues', '_blank')
							.focus();
					}}
					bugButton
				/>
			</div>
		</header>
	);
};

export default Header;
