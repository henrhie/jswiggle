import * as React from 'react';

interface Icode {
	html: string;
	css: string;
	javascript: string;
}

const initCode: Icode = {
	html: '',
	css: '',
	javascript: '',
};

export const CodeContext = React.createContext<Icode | undefined>(undefined);

export const useGlobalCode = (): Icode => {
	return React.useContext(CodeContext);
};
