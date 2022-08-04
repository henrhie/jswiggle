/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import HeaderItem from './header-item';
import FlashIcon from 'jsx:../../assets/svg/flash.svg';
import ShareIcon from 'jsx:../../assets/svg/share.svg';
import ForkIcon from 'jsx:../../assets/svg/hierarchy.svg';
import Note from 'jsx:../../assets/svg/note.svg';
import { useActions } from '../../hooks/use-actions';
import { useStore } from 'react-redux';
import { IState } from '../../redux';

import './header.css';

const Header = ({ updateCodeStore, resetPreviewContent }) => {
	const { startBundle } = useActions();
	const store = useStore<IState>();

	return (
		<header>
			<HeaderItem
				text='Run'
				Icon={FlashIcon}
				handleClick={() => {
					updateCodeStore();
					startBundle(store.getState());
				}}
			/>
			<HeaderItem
				text='Reset Preview'
				Icon={Note}
				handleClick={resetPreviewContent}
			/>
			{/* <HeaderItem text='Collaborate' Icon={ShareIcon} handleClick={() => {}} /> */}
		</header>
	);
};

export default Header;
