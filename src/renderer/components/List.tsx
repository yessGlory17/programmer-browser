import { Accordion } from "@chakra-ui/react";
import { useContext } from "react";
import { SearchContext } from "renderer/context/SearchContext";
import BrowserCollapse from "./BrowserCollapse";

const List = () => {

  const {tabs} = useContext(SearchContext);

  return (
    <div>
     <Accordion width='95vw' allowToggle _hover={{}}
      border='none' backgroundColor='#32363e' margin='10px' overflowY='scroll' >
        {tabs.map((tab,index)=>(
            <BrowserCollapse key={index} name={tab.keyword} tabUrl={tab.url} tabId={tab.tabId}/>
          ))}
      </Accordion>
    </div>
  )

}


export default List;
