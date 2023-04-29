import { RefObject, useEffect, useState } from 'react';
import { WebViewOverride } from 'renderer/components/BrowserCollapse/BrowserCollapse';

const useWebviewReady = (ref: RefObject<WebViewOverride>) => {
  const [isReady, setReady] = useState<boolean>(false);

  useEffect(() => {
    const ready = () => {
      setReady(!isReady);
    };
    ref.current?.addEventListener('dom-ready', ready);

    return () => {
      ref.current?.removeEventListener('dom-ready', ready);
    };
  }, [ref.current]);

  return isReady;
};

export default useWebviewReady;
