import * as vscode from 'vscode';
import { WebViewManager } from './webview';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(
		'jsfiddle.helloWorld',
		() => {
			WebViewManager.createOrShow(context.extensionUri);
		}
	);

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
