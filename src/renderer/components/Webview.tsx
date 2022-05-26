import {useEffect, useRef} from 'react';


const Webview = ({ url, width, height, viewRef}) => {



  return (
    <webview
      ref={viewRef}
      className='browser-view'
      src={url}
      style={{
        width:width,
        height:height,
        backgroundColor:'transparent',
        margin:'0px',
        padding:'0px'
      }}
      useragent='Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'
      >
      </webview>
  )
}

export default Webview;
