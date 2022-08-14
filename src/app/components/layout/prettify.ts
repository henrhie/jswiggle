import * as prettier from 'prettier';
import * as parser from 'prettier/parser-babel';
import * as html_parser from 'prettier/parser-html';
import * as style_parser from 'prettier/parser-postcss';

export const prettify = (
	markdown: string,
	stylesheet: string,
	script: string,
	mode: Partial<{
		activeMarkdown: string;
		activeStyleSheet: string;
		activeScript: string;
	}>
) => {
	let formattedStyleSheet: string;
	let formattedMarkdown: string;
	let formattedScript: string;

	//prettify markdown
	formattedMarkdown = prettier
		.format(markdown, {
			parser: mode.activeMarkdown,
			singleQuote: true,
			plugins: [html_parser],
		})
		.replace(/\n$/, '');

	//prettify stylesheet
	formattedStyleSheet = prettier
		.format(stylesheet, {
			parser: mode.activeStyleSheet === 'sass' ? 'scss' : mode.activeStyleSheet,
			semi: true,
			singleQuote: true,
			plugins: [style_parser],
		})
		.replace(/\n$/, '');

	//prettify script
	formattedScript = prettier
		.format(script, {
			parser: mode.activeScript === 'javascript' ? 'babel' : 'babel-ts',
			useTabs: false,
			semi: true,
			singleQuote: true,
			plugins: [parser],
		})
		.replace(/\n$/, '');

	return { formattedMarkdown, formattedScript, formattedStyleSheet };
};
