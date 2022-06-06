import { createContext, useState } from 'react';

type TabContextProps = {
  currentTabIndex: unknown;
  setTabIndex: React.Dispatch<React.SetStateAction<unknown>>;
  nextTab: (evt: KeyboardEvent) => void;
};

type TabContextProviderProps = {
  children: React.ReactNode;
};

export const TabContext = createContext<Partial<TabContextProps>>({});

export const TabContextProvider = ({ children }: TabContextProviderProps) => {
  const [currentTabIndex, setTabIndex] = useState<unknown>(0);

  const nextTab = (event: KeyboardEvent) => {
    if (event.ctrlKey && Number.isFinite(Number(event.key))) {
      if (Number(event.key) - 1 === currentTabIndex) {
        setTabIndex(null);
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
