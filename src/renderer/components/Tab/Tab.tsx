import { Tab, TabContext } from 'renderer/context/Alpha/TabContext';
import { Button, Flex } from '../core';
import withTextAndIconButton from 'renderer/hoc/withTextAndIconButton';
import { PlusIcon } from '../Icons';
import { createRef, useContext, useRef } from 'react';
import { WebViewOverride } from '../BrowserCollapse/BrowserCollapse';

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
            const webviewRef = createRef<WebViewOverride>();
            const tab: Tab = {
              keyword: '',
              webviewRef: webviewRef,
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
