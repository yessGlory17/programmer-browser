import { createContext, useState } from 'react';
import ShortcutKeys from 'renderer/hooks/shortcut/ShortcutKeys';
import useHotkeys from 'renderer/hooks/shortcut/useHotkeys';
import { v4 as uuidv4 } from 'uuid';

type Tab = {
  tabId: string;
  keyword: string;
  url: string;
};

type SearchContextProviderProps = {
  children: React.ReactNode;
};

type SearchContextProps = {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  searchEngine: string;
  setSearchEngine: React.Dispatch<React.SetStateAction<string>>;
  // selectSearchEngine;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  search: () => void;
  tabs: Tab[];
  setTabs: React.Dispatch<React.SetStateAction<Tab[] | undefined>>;
  closeTab: (id: string) => void;
};

export const SearchContext = createContext<Partial<SearchContextProps>>({});

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [url, setUrl] = useState<string>('google');
  const [keyword, setKeyword] = useState<string>('');
  const [searchEngine, setSearchEngine] = useState<string>(
    'https://www.google.com/search?q='
  );
  const [tabs, setTabs] = useState<Tab[] | undefined>([]);

  // const selectSearchEngine = (event: Event) => setSearchEngine(event.target.value);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword((event.target as HTMLInputElement).value);

  const getSearchPath = (searchEnginePath: string, searchPath: string) => {
    const urlExpression = /(http(s)?:\/\/)[a-zA-Z0-9]+(\.[^\s]{2,})+/;
    if (searchPath.match(urlExpression)) {
      return searchPath;
    }

    return searchEnginePath + searchPath;
  };

  const search = () => {
    const searchKeyword = getSearchPath(searchEngine, keyword);
    setUrl(searchKeyword);
    const newTab: Tab = {
      tabId: uuidv4(),
      keyword,
      url: searchKeyword,
    };
    if (tabs) {
      setTabs([...tabs, newTab]);
    }
  };

  const closeTab = (id: string) => {
    const result = tabs?.filter((item) => item.tabId !== id);
    setTabs(result);
  };

  //Close All Tabs Shortcut: Alt+X
  useHotkeys(`${ShortcutKeys.ALT}+${ShortcutKeys.X}`, () => {
    setTabs([]);
  });

  return (
    <SearchContext.Provider
      value={{
        url,
        setUrl,
        keyword,
        setKeyword,
        searchEngine,
        setSearchEngine,
        onChange,
        search,
        tabs,
        closeTab,
        setTabs,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
