import { RepeatIcon } from '@chakra-ui/icons';
import {
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import React, { useContext, useRef } from 'react';
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from 'react-icons/ai';
import { SearchContext } from '../context/SearchContext';
import Webview from './Webview';

type BrowserCollapseTypes = {
  name: string;
  tabUrl: string;
  tabId: string;
  onOpen: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => void;
  index: number;
};

type WebViewOverride = {
  canGoBack: () => void;
  goBack: () => void;
  canGoForward: () => void;
  goForward: () => void;
  isLoading: () => void;
  stop: () => void;
  reload: () => void;
  getTitle: () => string;
} & HTMLWebViewElement;

const BrowserCollapse = ({
  name,
  tabUrl,
  tabId,
  onOpen,
  index,
}: BrowserCollapseTypes) => {
  const webviewRef = useRef<WebViewOverride>(null);

  const { closeTab } = useContext(SearchContext);

  const close = (id: string) => closeTab?.(id);

  const back = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (webviewRef.current?.canGoBack()) webviewRef.current.goBack();
  };

  const forward = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (webviewRef.current?.canGoForward()) webviewRef.current?.goForward();
  };

  const refresh = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (webviewRef.current?.isLoading()) {
      webviewRef.current?.stop();
    } else {
      webviewRef.current?.reload();
    }
  };

  const getTitle = (): string => {
    if (!webviewRef.current) {
      return name;
    }
    return webviewRef.current.getTitle();
  };
  return (
    <AccordionItem border="none">
      <h2>
        <AccordionButton
          _expanded={{ bg: '#03c9d7', color: 'white' }}
          onClick={(e) => {
            onOpen(e, index);
          }}
        >
          <IconButton
            aria-label="back-button"
            backgroundColor="#32363e"
            _hover={{ bg: '#32363e' }}
            size="xs"
            onClick={(e) => back(e)}
            icon={<Icon as={AiOutlineLeft} _hover={{ color: 'red' }} />}
          />
          <Box flex="1" textAlign="left" marginLeft="5px" marginRight="5px">
            <p style={{ textAlign: 'center' }}>{getTitle()}</p>
          </Box>
          <IconButton
            aria-label="forward-button"
            backgroundColor="#32363e"
            marginRight="10px"
            _hover={{ bg: '#32363e' }}
            size="xs"
            onClick={(e) => forward(e)}
            icon={<Icon as={AiOutlineRight} _hover={{ color: 'red' }} />}
          />
          <IconButton
            aria-label="refresh-button"
            backgroundColor="#32363e"
            marginRight="10px"
            _hover={{ bg: '#32363e' }}
            size="xs"
            onClick={(e) => refresh(e)}
            icon={<RepeatIcon _hover={{ color: 'yellow' }} />}
          />
          <IconButton
            aria-label="close-button"
            backgroundColor="#32363e"
            _hover={{ bg: '#32363e' }}
            size="xs"
            onClick={() => close(tabId)}
            icon={<Icon as={AiOutlineClose} _hover={{ color: 'red' }} />}
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
