import { createContext, useState } from "react";
import {v4 as uuidv4} from 'uuid';
export const SearchContext = createContext();

export const SearchContextProvider = (props) => {

  const [url, setUrl] = useState('google');
  const [keyword, setKeyword] = useState();
  const [searchEngine, setSearchEngine] = useState('https://www.google.com/search?q=');
  const [tabs, setTabs] = useState([]);

  const selectSearchEngine = (event) => setSearchEngine(event.target.value);
  const onChange = (event) => setKeyword(event.target.value);

  const search = () => {
    const searchKeyword = searchEngine + keyword;
    setUrl(searchKeyword);
    const newTab = {
      'tabId':uuidv4(),
      'keyword':keyword,
      'url':searchKeyword,
    }
    setTabs([...tabs, newTab]);

    console.log(searchEngine);
  }

  const closeTab = (id) => {
    const result = tabs.filter(item => item.tabId != id);
    console.log(result)
    setTabs(result);
  }

  return (
    <SearchContext.Provider
      value={{
        url,
        setUrl,
        keyword,
        setKeyword,
        searchEngine,
        setSearchEngine,
        selectSearchEngine,
        onChange,
        search,
        tabs,
        closeTab
      }}>
      {props.children}
    </SearchContext.Provider>
  )

}



