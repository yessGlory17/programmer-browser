import React from 'react';

type WebviewProps = {
  url: string;
  width: string;
  height: string;
  viewRef: React.Ref<HTMLWebViewElement>;
};

const Webview = ({ url, width, height, viewRef }: WebviewProps) => {
  return (
    <webview
      ref={viewRef}
      className="browser-view"
      src={url}
      style={{
        width,
        height,
        backgroundColor: 'transparent',
        margin: '0px',
        padding: '0px',
        borderRadius: '15px',
      }}
      useragent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36"
    />
  );
};

export default Webview;
