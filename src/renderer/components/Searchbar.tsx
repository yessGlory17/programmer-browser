import { SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  HStack,
} from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { SiDuckduckgo } from 'react-icons/si';
import { FaYandexInternational } from 'react-icons/fa';
import '../App.css';
import { SearchContext } from '../context/SearchContext';
import { TabContext } from '../context/TabContext';
import SearchEngineModal from './Settings/SearchEngineModal';

const Searchbar = () => {
  const [isModalOpen, setModal] = useState<boolean>(false);

  const { onChange, search, searchEngine } = useContext(SearchContext);

  const { nextTab } = useContext(TabContext);

  const handleSetSearchEngineShortcut = useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey && (event.key === 'E' || event.key === 'e')) {
        setModal(!isModalOpen);
      }

      if (event.ctrlKey && event.key === 'ArrowLeft') {
        window.electron.ipcRenderer.sendMessage('window-move', 'topLeft');
      }

      if (event.ctrlKey && event.key === 'ArrowRight') {
        window.electron.ipcRenderer.sendMessage('window-move', 'topRight');
      }

      nextTab?.(event);
    },
    [nextTab, isModalOpen]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleSetSearchEngineShortcut);

    return () => {
      document.removeEventListener('keydown', handleSetSearchEngineShortcut);
    };
  }, [handleSetSearchEngineShortcut]);

  const getEngineIcon = () => {
    switch (searchEngine) {
      case 'https://www.google.com/search?q=':
        return <FcGoogle />;
      case 'https://yandex.com.tr/search/?text=':
        return <FaYandexInternational />;
      case 'https://duckduckgo.com/?q=':
        return <SiDuckduckgo />;
      default:
        return <FcGoogle />;
    }
  };

  return (
    <>
      <HStack w="95vw">
        <InputGroup size="md" h="40px" id="search-bar-container">
          <InputLeftAddon
            h="40px"
            color="white"
            backgroundColor="#32363e"
            border="none"
            onClick={() => setModal(!isModalOpen)}
          >
            {getEngineIcon()}
          </InputLeftAddon>
          <Input
            variant="filled"
            placeholder="Search"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && search?.()}
            onChange={(e) => onChange?.(e)}
            backgroundColor="#32363e"
            _focus={{ backgroundColor: '#32363e' }}
            _hover={{ backgroundColor: '#32363e' }}
          />

          <InputRightElement>
            <Button
              h="40px"
              w="40px"
              size="sm"
              leftIcon={<SearchIcon />}
              backgroundColor="#32363e"
              variant="solid"
              onClick={search}
              _hover={{
                backgroundColor: '#32363e',
              }}
              _focus={{
                backgroundColor: '#32363e',
                outline: 'none',
              }}
            />
          </InputRightElement>
        </InputGroup>
      </HStack>
      <SearchEngineModal isOpen={isModalOpen} onClose={() => setModal(false)} />
    </>
  );
};

export default Searchbar;
