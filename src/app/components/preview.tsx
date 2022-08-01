import * as React from 'react';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

const html = (ext: string) => `
    <html>
    <head>
			<meta http-equiv="content-type" content="text/html; charset=UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
				html {  }
				body { padding: 0, margin: 0, background-color: 'red'}
			</style>
    </head>
    <body>
    <div id="root"></div>
    ${ext}
    <script>
    const handleError = (err) => {
      window.parent.postMessage([[{ err }]], '*')
    };
    window.addEventListener('error', (e) => {
      e.preventDefault();
      handleError(e.error);
    });

    console.stdlog = console.log.bind(console);
	  console.logs = [];
	  console.log = function () {
		  console.logs.push(Array.from(arguments));
		  console.stdlog.apply(console, arguments);
	  };

    window.addEventListener('message', (event) => {
      try {
        eval(event.data)
        console.logs = JSON.parse(JSON.stringify(console.logs));
        window.parent.postMessage(console.logs, '*')
				console.logs.length = 0
      } catch (err) {
        handleError(err);
      }
    }, false);
    </script>
    </body>
    </html>
  `;

// eslint-disable-next-line @typescript-eslint/naming-convention
const Preview: React.FC<{ code: string; htmlExt: string; ref: any }> = ({
	code,
	htmlExt,
}) => {
	const { updateConsoleLogs } = useActions();

	const { consoleInput, loading } = useTypedSelector(({ execution }) => {
		return { consoleInput: execution.consoleInput, loading: execution.loading };
	});

	const iframeRef = React.useRef<any>();

	const logListener = React.useCallback((e: any) => {
		if (e.data.length > 0) {
			updateConsoleLogs(e.data);
		}
	}, []);

	React.useEffect(() => {
		window.addEventListener('message', logListener);
		return () => {
			window.removeEventListener('message', logListener);
		};
	}, [logListener]);

	React.useEffect(() => {
		if (!iframeRef) {
			return;
		}
		setTimeout(() => {
			iframeRef.current.contentWindow.postMessage(consoleInput, '*');
		}, 50);
	}, [consoleInput]);

	React.useEffect(() => {
		if (!iframeRef) {
			return;
		}
		iframeRef.current.srcdoc = html(htmlExt);
		setTimeout(() => {
			iframeRef.current.contentWindow.postMessage(code, '*');
		}, 50);
	}, [code, htmlExt]);

	if (loading) {
		htmlExt = '';
	}

	return (
		<div className='preview-wrapper'>
			<iframe
				ref={iframeRef}
				sandbox='allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation'
				srcDoc={html(htmlExt)}
				allow='accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share'
				allowFullScreen
				allowTransparency
				style={{ backgroundColor: 'white' }}
			/>
		</div>
	);
};

export default React.memo(Preview);
