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
      }}
      useragent="Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
    />
  );
};

export default Webview;
