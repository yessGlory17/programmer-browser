import { useEffect, useContext } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Select,
} from '@chakra-ui/react';

import { SearchContext } from '../../context/SearchContext';

// eslint-disable-next-line react/prop-types
const SearchEngineModal = ({ isOpen, onClose }) => {
  const {
    url,
    setUrl,
    keyword,
    setKeyword,
    onChange,
    search,
    setSearchEngine,
    searchEngine
  } = useContext(SearchContext);

  const onChangeSelect = (event) => setSearchEngine(event.target.value);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backgroundColor='transparent' />
        <ModalContent
          backgroundColor="#32363e"
          onChange={(e) => onChangeSelect(e)}
        >
          <ModalHeader>Search Engine Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom='20px' >
            <Select
              value={searchEngine}
              backgroundColor={{ backgroundColor: '#32363e' }}
            >
              <option value='https://www.google.com/search?q=' style={{backgroundColor:'#32363e'}} > Google</option>
              <option value='https://duckduckgo.com/?q=' style={{backgroundColor:'#32363e'}}>DucDuckGo</option>
              <option value='https://yandex.com.tr/search/?text=' style={{backgroundColor:'#32363e'}}>Yandex</option>
            </Select>
          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  )
}

export default SearchEngineModal;
