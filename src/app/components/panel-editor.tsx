/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import Editor from './editor';

const PanelEditor = ({ value, setValue, language }) => {
	return (
		<div
			style={{
				height: '100%',
				backgroundColor: '#141E27',
			}}>
			<div
				style={{
					height: '100%',
					backgroundColor: '#263238',
					padding: '0.5rem 0.7rem',
				}}>
				<div>
					<p
						style={{
							margin: '0',
							marginBottom: '8px',
							color: '#fff',
						}}>
						{language === 'xml' ? 'HTML' : language}
					</p>
				</div>
				<Editor
					language={language}
					value={value}
					handleValueChange={setValue}
				/>
			</div>
		</div>
	);
};

export default PanelEditor;
