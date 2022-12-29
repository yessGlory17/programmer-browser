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
import React, { useContext, useEffect, useRef } from 'react';
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from 'react-icons/ai';
import { FindInPageContext } from 'renderer/context/FindInPageContext';
import { TabContext } from 'renderer/context/TabContext';
import ShortcutKeys from 'renderer/hooks/shortcut/ShortcutKeys';
import useHotkeys from 'renderer/hooks/shortcut/useHotkeys';
import { SearchContext } from '../../context/SearchContext';
import FindInPage from '../FindInPage/FindInPage';
import Webview from '../Webview/Webview';

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

export type WebViewOverride = {
  canGoBack: () => void;
  goBack: () => void;
  canGoForward: () => void;
  goForward: () => void;
  isLoading: () => void;
  stop: () => void;
  reload: () => void;
  getTitle: () => string;
  findInPage: (text: string, options: Object) => any;
  stopFindInPage: (action: string) => any;
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
  const { setShowFind } = useContext(FindInPageContext);
  const { currentTabIndex } = useContext(TabContext);

  const close = (id: string) => closeTab?.(id);

  useHotkeys(`${ShortcutKeys.CTRL}+${ShortcutKeys.F}`, () => {
    if (index === currentTabIndex) {
      setShowFind?.(true);
    }
  });

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
    <>
      <AccordionItem border="none">
        <h2>
          <FindInPage webviewRef={webviewRef} index={index}>
            <AccordionButton
              as="div"
              style={{ height: '40px' }}
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
          </FindInPage>
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
    </>
  );
};

export default BrowserCollapse;
