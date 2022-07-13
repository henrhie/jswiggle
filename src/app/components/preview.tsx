import * as React from 'react';



// eslint-disable-next-line @typescript-eslint/naming-convention
const Preview: React.FC<{ code: string, html_ext: string }> = ({ code, html_ext }) => {

  const html = (ext: string) =>`
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
		iframeRef.current.contentWindow.postMessage(code, '*');
  }, [code]);

	React.useEffect(() => {
		iframeRef.current.srcdoc = html(html_ext);
	}, [code]);

	return (
		<div className='preview-wrapper'>
			<iframe ref={iframeRef} sandbox='allow-scripts' srcDoc={html(html_ext)} />
		</div>
	);
};

export default Preview;
