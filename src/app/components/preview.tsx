import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
const Preview: React.FC<{ code: string; htmlExt: string }> = ({
	code,
	htmlExt,
}) => {
	console.log('preview called %%%%%%%%%%%: ', htmlExt);
	const html = (ext: string) => `
    <html>
    <head>
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
    window.addEventListener('message', (event) => {
      try {
      eval(event.data);
      } catch (err) {
        handleError(err);
      }
    }, false);
    </script>
    </body>
    </html>
  `;
	const iframeRef = React.useRef<any>();

	React.useEffect(() => {
		if (!iframeRef) {
			return;
		}
		console.log('code:::: ', code);
		iframeRef.current.contentWindow.postMessage(code, '*');
	}, [code]);

	React.useEffect(() => {
		console.log('use effect called 000000000000000000: ', htmlExt);
		iframeRef.current.srcdoc = html(htmlExt);
	}, [htmlExt]);

	return (
		<div className='preview-wrapper'>
			<iframe ref={iframeRef} sandbox='allow-scripts' srcDoc={html(htmlExt)} />
		</div>
	);
};

export default React.memo(Preview);
