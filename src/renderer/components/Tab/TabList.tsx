import { TabContext } from 'renderer/context/Alpha/TabContext';
import { Flex } from '../core';
import withTextAndIconButton from 'renderer/hoc/withTextAndIconButton';
import { PlusIcon } from '../Icons';
import { createRef, useContext } from 'react';
import Tab from './Tab';
import { WebViewOverride } from '../core/types';

const NewTab = withTextAndIconButton(PlusIcon);

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
