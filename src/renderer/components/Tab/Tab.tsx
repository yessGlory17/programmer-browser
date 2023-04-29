import { Tab, TabContext } from 'renderer/context/Alpha/TabContext';
import { Button, Flex } from '../core';
import withTextAndIconButton from 'renderer/hoc/withTextAndIconButton';
import { PlusIcon } from '../Icons';
import { RefObject, useContext, useRef } from 'react';
import { WebViewOverride } from '../BrowserCollapse/BrowserCollapse';
import { Webview } from 'renderer/components/Webview';
import { Container } from 'renderer/components/core';

const NewTab = withTextAndIconButton(PlusIcon);

type TabProps = {
  index: number;
};

function Tab({ index }: TabProps) {
  const { setTabIndex, tabIndex } = useContext(TabContext);

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
      New Tab
    </Button>
  );
}

type TabPanelProps = {
  index: number;
};

export function TabPanel({ index }: TabPanelProps) {
  const { tabs, tabIndex } = useContext(TabContext);

  const passive = index !== tabIndex;

  return (
    <Container
      width="calc(100vw - 250px)"
      height="100vh"
      debug
      style={{ backgroundColor: 'cyan', display: passive ? 'none' : 'block' }}
    >
      <Webview
        url="https://www.google.com/search?q="
        viewRef={tabs?.[index]?.webviewRef ?? null}
        width="100%"
        height="100%"
      />
    </Container>
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
            const ref = useRef<WebViewOverride>(null);
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
