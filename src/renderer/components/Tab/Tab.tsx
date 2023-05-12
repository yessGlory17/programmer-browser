import { Tab, TabContext } from 'renderer/context/Alpha/TabContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import Favicon from '../Favicon';
import TabButton from './TabButton';
import TabText from './TabText';
import useTab from 'renderer/hooks/useTab';

type TabProps = {
  index: number;
};

function Tab({ index }: TabProps) {
  const { setTabIndex, tabIndex, tabs } = useContext(TabContext);
  const { title, favicon } = useTab({ index });
  const [isFaviconUpdated, setFaviconUpdated] = useState<boolean>(false);

  useEffect(() => {
    const update = () => {
      setFaviconUpdated(!isFaviconUpdated);
    };
    tabs?.[index]?.webviewRef?.current?.addEventListener(
      'page-title-updated',
      update
    );

    return () => {
      tabs?.[index]?.webviewRef?.current?.removeEventListener(
        'page-title-updated',
        update
      );
    };
  }, []);

  // useEffect(() => {
  //   tabs?.map((tab) => {
  //     tab?.webviewRef?.current?.addEventListener('page-title-updated', () => {
  //       console.log('page title updated!');
  //     });
  //   });
  // }, [tabs]);

  const getTitle = (): string => {
    const currentTab = tabs?.[index];
    if (!currentTab?.webviewRef?.current) {
      return 'New Tab';
    }
    return currentTab?.webviewRef?.current.getTitle();
  };

  const getFavicon = useCallback(() => {
    const currentTab = tabs?.[index];
    if (!currentTab?.webviewRef?.current) {
      return '';
    }
    return currentTab?.webviewRef?.current.getURL();
  }, [isFaviconUpdated]);

  return (
    <TabButton onClick={() => setTabIndex?.(index)} active={tabIndex === index}>
      <Favicon src={favicon} /> <TabText>{title}</TabText>
    </TabButton>
  );
}

export default Tab;
