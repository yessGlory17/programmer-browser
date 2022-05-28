import { CloseIcon, ArrowLeftIcon, RepeatIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  IconButton,
} from '@chakra-ui/react';
import {
  MouseEvent,
  MouseEvent,
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { SearchContext } from 'renderer/context/SearchContext';
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from 'react-icons/ai';
import Webview from './Webview';

const BrowserCollapse = ({ name, tabUrl, tabId }) => {
  const webviewRef = useRef();

  const [collapseName, setCollapseName] = useState(name);

  const { closeTab } = useContext(SearchContext);

  const close = (id: any) => closeTab(id);

  const back = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    webviewRef.current.canGoBack() && webviewRef.current.goBack();
  };

  const forward = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    webviewRef.current.canGoForward() && webviewRef.current.goForward();
  };

  const refresh = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    webviewRef.current.isLoading()
      ? webviewRef.current.stop()
      : webviewRef.current.reload();
  };

  const getTitle = () => {
    if (webviewRef.current === undefined) {
      return name;
    }
    return webviewRef.current.getTitle();
  };
  return (
    <AccordionItem border="none">
      <h2>
        <AccordionButton _expanded={{ bg: '#03c9d7', color: 'white' }}>
          <IconButton
            backgroundColor="#32363e"
            _hover={{ bg: '#32363e' }}
            size="xs"
            onClick={(e) => back(e)}
            icon={<AiOutlineLeft _hover={{ color: 'red' }} />}
          />
          <Box flex="1" textAlign="left" marginLeft="5px" marginRight="5px">
            <p style={{ textAlign: 'center' }}>{getTitle()}</p>
          </Box>
          <IconButton
            backgroundColor="#32363e"
            marginRight="10px"
            _hover={{ bg: '#32363e' }}
            size="xs"
            onClick={(e) => forward(e)}
            icon={<AiOutlineRight _hover={{ color: 'red' }} />}
          />
          <IconButton
            backgroundColor="#32363e"
            marginRight="10px"
            _hover={{ bg: '#32363e' }}
            size="xs"
            onClick={(e) => refresh(e)}
            icon={<RepeatIcon _hover={{ color: 'yellow' }} />}
          />
          <IconButton
            backgroundColor="#32363e"
            _hover={{ bg: '#32363e' }}
            size="xs"
            onClick={() => close(tabId)}
            icon={<AiOutlineClose _hover={{ color: 'red' }} />}
          />

          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel height="100vh" padding="0px">
        <Webview
          url={tabUrl}
          width="95vw"
          height="100vh"
          viewRef={webviewRef}
        />
      </AccordionPanel>
    </AccordionItem>
  );
};

export default BrowserCollapse;
