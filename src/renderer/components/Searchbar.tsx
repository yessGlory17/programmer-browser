import { SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  HStack,
  Select,
} from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { SearchContext } from 'renderer/context/SearchContext';
import { FcGoogle } from 'react-icons/fc';
import { SiDuckduckgo } from 'react-icons/si';
import { FaYandexInternational } from 'react-icons/fa';
import '../App.css';
import { TabContext } from 'renderer/context/TabContext';
import SearchEngineModal from './Settings/SearchEngineModal';

const Searchbar = ({}) => {
  const [isModalOpen, setModal] = useState(false);

  const onClose = () => setModal(!isModalOpen);

  const { url, setUrl, keyword, setKeyword, onChange, search, searchEngine } =
    useContext(SearchContext);

  const { nexTab,setTabIndex } = useContext(TabContext);

  const handleSetSearchEngineShortcut = useCallback((event) => {
    if (event.ctrlKey && (event.key === 'E' || event.key === 'e')) {
      onClose();
    }

    nexTab(event);



  });

  useEffect(() => {
    document.addEventListener('keydown', handleSetSearchEngineShortcut);

    return () => {
      document.removeEventListener('keydown', handleSetSearchEngineShortcut);
    };
  }, []);

  const getEngineIcon = () => {
    switch (searchEngine) {
      case 'https://www.google.com/search?q=':
        return <FcGoogle />;
      case 'https://yandex.com.tr/search/?text=':
        return <FaYandexInternational />;
      case 'https://duckduckgo.com/?q=':
        return <SiDuckduckgo />;
    }
  };

  return (
    <>
      <HStack w="95vw">
        <InputGroup size="md" h="40px" id="search-bar-container">
          <InputLeftAddon
            h="40px"
            children={getEngineIcon()}
            color="white"
            backgroundColor="#32363e"
            border="none"
            onClick={onClose}
          />
          <Input
            variant="filled"
            placeholder="Search"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && search()}
            onChange={onChange}
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
      <SearchEngineModal isOpen={isModalOpen} onClose={onClose} />
    </>
  );
};

export default Searchbar;
