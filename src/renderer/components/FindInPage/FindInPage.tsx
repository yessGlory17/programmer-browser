import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverContent,
} from '@chakra-ui/react';
import {
  ChangeEvent,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { FindInPageContext } from 'renderer/context/FindInPageContext';
import { TabContext } from 'renderer/context/TabContext';
import useWebviewReady from 'renderer/hooks/webview/useWebviewReady';
import { WebViewOverride } from '../BrowserCollapse';

type FindInPageProps = {
  children: ReactNode;
  webviewRef: RefObject<WebViewOverride>;
  index: number;
};

const FindInPage = ({ children, webviewRef, index }: FindInPageProps) => {
  const firstFieldRef = useRef(null);
  const { isShowFind, setShowFind } = useContext(FindInPageContext);
  const { currentTabIndex } = useContext(TabContext);

  const [keyword, setKeyword] = useState<string | null>(null);

  const isWebviewReady = useWebviewReady(webviewRef);

  const searchInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const word = e.currentTarget.value;
    if (word && word !== ' ') {
      webviewRef.current?.findInPage(word, {});
      setKeyword(word);
    }
  };

  const searchNavigation = (direction: 'forward' | 'back') => {
    if (keyword && keyword !== ' ') {
      webviewRef.current?.findInPage(keyword, {
        forward: direction === 'forward' ? true : false,
        findNext: true,
      });
    }
  };

  const clearAllSelection = () => {
    if (isWebviewReady) {
      webviewRef.current?.stopFindInPage('clearSelection');
      setShowFind?.(false);
    }
  };

  useEffect(() => {
    if (currentTabIndex !== index && webviewRef.current) {
      clearAllSelection();
    }
  }, [currentTabIndex]);

  return (
    <>
      <Popover
        isOpen={isShowFind}
        initialFocusRef={firstFieldRef}
        placement="bottom-end"
        closeOnBlur={false}
      >
        <PopoverAnchor>{children}</PopoverAnchor>
        <PopoverContent backgroundColor="#32363e">
          <HStack
            direction={[]}
            spacing={1}
            style={{ paddingLeft: '10px', paddingRight: '10px' }}
          >
            <FormControl>
              <Input
                style={{ height: '30px' }}
                ref={firstFieldRef}
                onChange={searchInputOnChange}
                placeholder="Search In Tab"
                border="none"
                _focus={{ outline: 'none' }}
              />
            </FormControl>
            <ButtonGroup display="flex" justifyContent="flex-end">
              <IconButton
                aria-label="back-button"
                backgroundColor="#32363e"
                _hover={{ bg: '#32363e' }}
                size="xs"
                icon={<Icon as={AiOutlineLeft} _hover={{ color: 'red' }} />}
                onClick={() => {
                  searchNavigation('back');
                }}
              />
              <IconButton
                aria-label="back-button"
                backgroundColor="#32363e"
                _hover={{ bg: '#32363e' }}
                size="xs"
                icon={<Icon as={AiOutlineRight} _hover={{ color: 'red' }} />}
                onClick={() => {
                  searchNavigation('forward');
                }}
              />
              <IconButton
                aria-label="close-button"
                backgroundColor="#32363e"
                _hover={{ bg: '#32363e' }}
                size="xs"
                onClick={clearAllSelection}
                icon={<Icon as={AiOutlineClose} _hover={{ color: 'red' }} />}
              />
            </ButtonGroup>
          </HStack>
        </PopoverContent>
      </Popover>
    </>
  );
};
export default FindInPage;
