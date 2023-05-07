import { Tab, TabContext } from 'renderer/context/Alpha/TabContext';
import { Flex } from '../core';
import withTextAndIconButton from 'renderer/hoc/withTextAndIconButton';
import { PlusIcon } from '../Icons';
import { createRef, useCallback, useContext, useEffect, useState } from 'react';
import { WebViewOverride } from '../BrowserCollapse/BrowserCollapse';
import { Webview } from 'renderer/components/Webview';
import { Container } from 'renderer/components/core';
import styled from 'styled-components';
import { SidebarToggleContext } from 'renderer/context/Alpha/SidebarToggleContext';

const NewTab = withTextAndIconButton(PlusIcon);

type WebviewWrapperProps = {
  passive: boolean;
  sidebarOpen: boolean;
};

const WebviewWrapper = styled(Container)<WebviewWrapperProps>`
  width: ${(props) =>
    props.sidebarOpen ? 'calc(100vw - 300px)' : 'calc(100vw - 50px)'};
  height: calc(100vh - 70px);
  border-radius: 20px;
  background-color: white;
  display: ${(props) => (props.passive ? 'none' : 'block')};
  margin-left: 30px;
`;

type TabProps = {
  index: number;
};

type TabButtonProps = {
  active: boolean;
};

const TabButton = styled('button')<TabButtonProps>`
  width: 250px;
  height: 30px;
  background-color: ${(props) => (props.active ? '#2599FF' : 'transparent')};
  border-radous: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  text-align: left;
`;

const Favicon = styled('img')`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  object-fit: cover;
`;

const TabText = styled('p')`
  color: white;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 200px;
  height: 1.2em;
  white-space: nowrap;
  padding-left: 8px;
`;

function Tab({ index }: TabProps) {
  const { setTabIndex, tabIndex, tabs } = useContext(TabContext);
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

  useEffect(() => {
    console.warn('favicon guncellendi.');
  }, [isFaviconUpdated]);

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
      <Favicon
        src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${getFavicon()}&size=64`}
      />{' '}
      <TabText>{getTitle()}</TabText>
    </TabButton>
  );
}

type TabPanelProps = {
  index: number;
};

export function TabPanel({ index }: TabPanelProps) {
  const { tabs, tabIndex } = useContext(TabContext);
  const { isOpen } = useContext(SidebarToggleContext);
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
      className="webview-wrapper"
      sidebarOpen={isOpen ?? true}
      //debug
      passive={passive()}
    >
      <Webview
        url={url}
        viewRef={tabs?.[index]?.webviewRef ?? null}
        width="inherit"
        height="inherit"
      />
    </WebviewWrapper>
  );
}

function TabList() {
  const { tabs, newTab } = useContext(TabContext);

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
