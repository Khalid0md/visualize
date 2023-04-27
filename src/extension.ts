// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const viewProvider = new VisualizeWebViewProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(VisualizeWebViewProvider.viewType, viewProvider)
	);

}

// This method is called when your extension is deactivated
export function deactivate() {}

class VisualizeWebViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'visualize.visualize-webview';
	private _view?: vscode.WebviewView;

	constructor(private readonly _extensionUri: vscode.Uri) {}

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,

			localResourceRoots: [
				this._extensionUri
			]
		};

		webviewView.webview.html = this.getWebViewContent(webviewView.webview);
	}

	private getWebViewContent(webview: vscode.Webview) {
		return `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Visualize Sidebar</title>
			</head>
			<body>
				<h1>Hello World!</h1>
			</body>
			</html>
		`;
	}
}
