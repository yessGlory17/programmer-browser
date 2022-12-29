import { ExpandedIndex } from '@chakra-ui/react';
import { createContext, useState } from 'react';

type TabContextProps = {
  currentTabIndex: ExpandedIndex | undefined;
  setTabIndex: React.Dispatch<React.SetStateAction<ExpandedIndex | undefined>>;
  nextTab: (evt: KeyboardEvent) => void;
};

type TabContextProviderProps = {
  children: React.ReactNode;
};

export const TabContext = createContext<Partial<TabContextProps>>({});

export const TabContextProvider = ({ children }: TabContextProviderProps) => {
  const [currentTabIndex, setTabIndex] = useState<ExpandedIndex | undefined>(0);

  const nextTab = (event: KeyboardEvent) => {
    if (event.ctrlKey && Number.isFinite(Number(event.key))) {
      if (Number(event.key) - 1 === currentTabIndex) {
        setTabIndex(undefined);
      } else {
        setTabIndex(Number(event.key) - 1);
      }
    }
  };

  return (
    <TabContext.Provider
      value={{
        currentTabIndex,
        setTabIndex,
        nextTab,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};
