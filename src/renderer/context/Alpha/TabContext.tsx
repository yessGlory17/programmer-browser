import { createContext, useEffect, useState } from 'react';
import { WebViewOverride } from 'renderer/components/BrowserCollapse/BrowserCollapse';

export type Tab = {
  keyword: string;
  webviewRef: React.RefObject<WebViewOverride>;
};

type TabContextProps = {
  tabIndex: number;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  tabs: Tab[];
  currentTab: Tab;
  newTab: (tab: Tab) => void;
};

type TabContextProviderProps = {
  children: React.ReactNode;
};

export const TabContext = createContext<Partial<TabContextProps>>({});

export function TabContextProvider({ children }: TabContextProviderProps) {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [currentTab, setCurrentTab] = useState<Tab>(tabs[tabIndex]);

  // Sekme indexi degistiginde aktif sekme degisecek.
  useEffect(() => {
    setCurrentTab(tabs[tabIndex]);
  }, [tabIndex]);

  useEffect(() => {
    console.warn('Current Tab Index: ', tabIndex);
  }, [currentTab]);

  // Yeni sekme ekleme

  function newTab(tab: Tab): void {
    setTabs([...tabs, tab]);
  }

  return (
    <TabContext.Provider
      value={{ tabIndex, setTabIndex, tabs, currentTab, newTab }}
    >
      {children}
    </TabContext.Provider>
  );
}
