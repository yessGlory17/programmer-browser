import { Accordion } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { SearchContext } from "renderer/context/SearchContext";
import { TabContext } from "renderer/context/TabContext";
import BrowserCollapse from "./BrowserCollapse";

const List = () => {

  const {tabs} = useContext(SearchContext);

  const {
    currentTabIndex,
    setTabIndex
  } = useContext(TabContext);

  const onOpen = (index) => {

    if(currentTabIndex == index) {
      setTabIndex(null)
    }else{
      setTabIndex(index)
    }

    console.log(tabs);
  }


  return (
    <div>
     <Accordion width='95vw' allowToggle _hover={{}} index={currentTabIndex}
      border='none' backgroundColor='#32363e' margin='10px' overflowY='scroll' >
        {tabs.map((tab,index)=>(
            <BrowserCollapse key={index} name={tab.keyword} tabUrl={tab.url} tabId={tab.tabId} onOpen={onOpen} index={index}/>
          ))}
      </Accordion>
    </div>
  )

}


export default List;
