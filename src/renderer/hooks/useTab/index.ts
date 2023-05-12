import { useContext, useEffect, useState } from 'react';
import { TabContext } from 'renderer/context/Alpha/TabContext';

type useTabProps = {
  index: number;
};

function useTab({ index }: useTabProps) {
  const [title, setTitle] = useState<string>('');
  const [favicon, setFavicon] = useState<string>('');
  const { tabs } = useContext(TabContext);

  useEffect(() => {
    tabs?.[index]?.webviewRef?.current?.addEventListener(
      'page-title-updated',
      () => {
        if (tabs?.[index]?.webviewRef?.current) {
          setTitle(tabs?.[index]?.webviewRef?.current?.getTitle() ?? '');
        }
        console.log('page title updated');
      }
    );

    return () =>
      tabs?.[index]?.webviewRef?.current?.removeEventListener(
        'page-title-updated',
        () => {
          if (tabs?.[index]?.webviewRef?.current) {
            setTitle(tabs?.[index]?.webviewRef?.current?.getTitle() ?? '');
          }
          console.log('page title removed');
        }
      );
  }, [tabs?.[index]?.webviewRef?.current]);

  useEffect(() => {
    tabs?.[index]?.webviewRef?.current?.addEventListener(
      'page-favicon-updated',
      () => {
        if (tabs?.[index]?.webviewRef?.current) {
          const url = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${
            tabs?.[index]?.webviewRef?.current?.getURL() ?? ''
          }&size=64`;
          setFavicon(url);
        }

        return 'Loading...';
      }
    );
  }, [tabs?.[index]?.webviewRef?.current]);

  return { title, favicon };
}

export default useTab;
