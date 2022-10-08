import { Accordion } from '@chakra-ui/react';
import { useContext } from 'react';
import ShortcutKeys from 'renderer/hooks/shortcut/ShortcutKeys';
import useHotkeys from 'renderer/hooks/shortcut/useHotkeys';
import { SearchContext } from '../context/SearchContext';
import { TabContext } from '../context/TabContext';
import BrowserCollapse from './BrowserCollapse';

const List = () => {
  const { tabs, setTabs } = useContext(SearchContext);

  const { currentTabIndex, setTabIndex } = useContext(TabContext);

  //Close Other Tabs: ALT+O
  useHotkeys(`${ShortcutKeys.ALT}+${ShortcutKeys.O}`, () => {
    const result = tabs?.filter((item, i) => i === currentTabIndex);
    setTabs?.(result);
  });

  const onOpen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    if (currentTabIndex === index) {
      setTabIndex?.(null);
    } else {
      setTabIndex?.(index);
    }
  };

  return (
    <div style={{ overflow: 'scroll', height: '95vh' }}>
      <Accordion
        width="95vw"
        allowToggle
        _hover={{}}
        index={currentTabIndex}
        border="none"
        backgroundColor="#32363e"
        margin="10px"
        overflowY="scroll"
      >
        {tabs?.map((tab, index) => (
          <BrowserCollapse
            key={tab.tabId}
            name={tab.keyword}
            tabUrl={tab.url}
            tabId={tab.tabId}
            onOpen={onOpen}
            index={index}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default List;
