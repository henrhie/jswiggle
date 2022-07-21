import * as React from 'react';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

const html = (ext: string) => `
    <html>
    <head>
			<meta http-equiv="content-type" content="text/html; charset=UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
      <style>html { background-color: white }</style>
    </head>
    <body>
    <div id="root"></div>
    ${ext}
    <script>
    const handleError = (err) => {
      const root = document.querySelector('#root');
      root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'; 
      console.log(err);
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
const Preview: React.FC<{ code: string; htmlExt: string; ref: any }> =
	React.forwardRef(({ code, htmlExt, ref }) => {
		const { updateConsoleLogs } = useActions();

		const consoleInput = useTypedSelector(({ consoleInput }) => {
			return consoleInput;
		});

		const iframeRef = React.useRef<any>();
		ref = iframeRef;

		React.useEffect(() => {
			const logListener = (e: any) => {
				if (e.data.length > 0) {
					updateConsoleLogs(e.data);
				}
			};
			window.addEventListener('message', logListener);
			return () => {
				window.removeEventListener('message', logListener);
			};
		});

		React.useEffect(() => {
			if (!iframeRef) {
				return;
			}
			setTimeout(() => {
				iframeRef.current.contentWindow.postMessage(consoleInput, '*');
				console.log('input console:::: ', consoleInput);
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

		return (
			<div className='preview-wrapper'>
				<iframe
					ref={iframeRef}
					sandbox='allow-scripts'
					srcDoc={html(htmlExt)}
				/>
			</div>
		);
	});

export default React.memo(Preview);
