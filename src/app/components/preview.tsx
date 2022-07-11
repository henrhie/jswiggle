import * as React from 'react';

const html = `
    <html>
    <head>
      <style>html { background-color: white }</style>
    </head>
    <body>
    <div id="root"></div>
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

// eslint-disable-next-line @typescript-eslint/naming-convention
const Preview: React.FC<{ code: string }> = ({ code }) => {
	const iframeRef = React.useRef<any>();

	const postForEval = () => {
		if (!iframeRef) {
			return;
		}
		iframeRef.current.contentWindow.postMessage(code, '*');
	};

	React.useEffect(() => {
		iframeRef.current.srcdoc = html;
	});

	return (
		<div className='preview-wrapper'>
			<iframe ref={iframeRef} sandbox='allow-scripts' srcDoc={html} />
		</div>
	);
};

export default Preview;
