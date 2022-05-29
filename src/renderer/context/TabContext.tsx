import { createContext, useCallback, useContext, useState } from 'react';
import { SearchContext } from './SearchContext';

export const TabContext = createContext();

export const TabContextProvider = (props) => {
  const [currentTabIndex, setTabIndex] = useState(0);

  const { closeTab, tabs } = useContext(SearchContext);

  const nexTab = (event) => {

    if (event.ctrlKey && isFinite(event.key)) {
      // if (Number(event.key) - 1 == currentTabIndex) {
      //   setTabIndex(null);
      // } else {
      //   setTabIndex(Number(event.key) - 1);
      // }



      setTabIndex(Number(event.key) - 1);

    }

    if (event.altKey && (event.key === 'X' || event.key === 'x')) {
      console.log('tab id', tabs);
      //closeTab(tabs)
    }
  };

  return (
    <TabContext.Provider
      value={{
        currentTabIndex,
        setTabIndex,
        nexTab,
      }}
    >
      {props.children}
    </TabContext.Provider>
  );
};
