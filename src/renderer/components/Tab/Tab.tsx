import { Tab, TabContext } from 'renderer/context/Alpha/TabContext';
import { Button, Flex } from '../core';
import withTextAndIconButton from 'renderer/hoc/withTextAndIconButton';
import { PlusIcon } from '../Icons';
import { createRef, useCallback, useContext, useEffect, useState } from 'react';
import { WebViewOverride } from '../BrowserCollapse/BrowserCollapse';
import { Webview } from 'renderer/components/Webview';
import { Container } from 'renderer/components/core';
import styled from 'styled-components';

const NewTab = withTextAndIconButton(PlusIcon);

type WebviewWrapperProps = {
  passive: boolean;
};

const WebviewWrapper = styled(Container)<WebviewWrapperProps>`
  background-color: white;
  display: ${(props) => (props.passive ? 'none' : 'active')};
`;

type TabProps = {
  index: number;
};

function Tab({ index }: TabProps) {
  const { setTabIndex, tabIndex, tabs } = useContext(TabContext);

  const getTitle = (): string => {
    const currentTab = tabs?.[index];
    if (!currentTab?.webviewRef?.current) {
      return 'New Tab';
    }
    return currentTab?.webviewRef?.current.getTitle();
  };
  return (
    <Button
      width="250px"
      height="30px"
      onClick={() => setTabIndex?.(index)}
      style={{
        backgroundColor:
          tabIndex === index ? 'rgba(17,17,17, 0.5)' : 'transparent',
        border: tabIndex === index ? '1px solid red' : 'none',
      }}
    >
      {getTitle()}
    </Button>
  );
}

type TabPanelProps = {
  index: number;
};

export function TabPanel({ index }: TabPanelProps) {
  const { tabs, tabIndex } = useContext(TabContext);
  const [isReady, setReady] = useState<boolean>(false);

  const currentTab = tabs?.[index];

  useEffect(() => {
    const ready = () => {
      setReady(!isReady);
    };
    tabs?.[index]?.webviewRef?.current?.addEventListener('dom-ready', ready);

    return () => {
      tabs?.[index]?.webviewRef?.current?.removeEventListener(
        'dom-ready',
        ready
      );
    };
  }, [tabs?.[index]?.webviewRef]);

  const passive = useCallback(() => {
    return index !== tabIndex && isReady;
  }, [index, tabIndex, isReady]);

  useEffect(() => {
    console.warn('webview is ready: ', isReady);
  }, [isReady]);

  useEffect(() => {
    console.log('current webview: ', tabs?.[index]?.webviewRef?.current);
  }, [tabs]);

  const url = `https://www.google.com/search?q=${currentTab?.keyword}`;

  return (
    <WebviewWrapper
      width="calc(100vw - 250px)"
      height="100vh"
      debug
      passive={passive()}
    >
      <Webview
        url={url}
        viewRef={tabs?.[index]?.webviewRef ?? null}
        width="100%"
        height="100%"
      />
    </WebviewWrapper>
  );
}

function TabList() {
  const { tabs, newTab } = useContext(TabContext);

  console.log('tabs: ', tabs);
  return (
    <Flex flexDirection="column">
      {tabs?.map((_, i) => (
        <Tab key={i} index={i} />
      ))}
      <NewTab
        text="New Tab"
        buttonProps={{
          onClick: () => {
            const ref = createRef<WebViewOverride>();
            const tab: Tab = {
              keyword: '',
              webviewRef: ref,
            };
            newTab?.(tab);
            console.log('new tab pressed');
          },
        }}
        textProps={{ style: { color: 'rgba(203, 203, 203,0.6)' } }}
      />
    </Flex>
  );
}
export default TabList;
