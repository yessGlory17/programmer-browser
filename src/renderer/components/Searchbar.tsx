import { SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  HStack
} from '@chakra-ui/react';
import {useContext, useEffect,useState} from 'react';
import { SearchContext } from 'renderer/context/SearchContext';
import '../App.css';
const Searchbar = ({}) => {

  const {
    url,
    setUrl,
    keyword,
    setKeyword,
    onChange,
    search
  } = useContext(SearchContext);

  return (
    <>
      <HStack w='95vw' >
        <InputGroup size='md' h='40px' id='search-bar-container'
        >
          {/* <InputLeftAddon h='40px' children='Google' color='white' backgroundColor='teal' /> */}
          <Input variant='filled' placeholder='Search' autoFocus
            onKeyDown={e => e.key === 'Enter' && search()}
            onChange={onChange}
            backgroundColor='#32363e'
            _focus={{backgroundColor:'#32363e'}}
            _hover={{backgroundColor:'#32363e'}}
            />

          <InputRightElement>
            <Button h='40px' w='40px' size='sm'
              leftIcon={<SearchIcon />}
              backgroundColor='#32363e'
              variant='solid'
              onClick={search}
              _hover={{
                backgroundColor:'#32363e',
              }}
              _focus={{
                backgroundColor:'#32363e',
                outline:'none'
              }}
            >
            </Button>
          </InputRightElement>
        </InputGroup>

      </HStack>

    </>
  );
}

export default Searchbar;
