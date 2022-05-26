
import { Input,
  InputGroup,
  Button,
  InputRightElement,
  InputLeftElement,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  VStack,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
  Container,
  Spacer
 } from '@chakra-ui/react';
import { useEffect,useState, useCon } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import BrowserCollapse from './components/BrowserCollapse';
import List from './components/List';
import Searchbar from './components/Searchbar';
import Webview from './components/Webview';
import {SearchContextProvider } from './context/SearchContext';


const Hello = () => {

  return (
    <div id="container">
      {/* Searchbar */}
      <SearchContextProvider>
        <Container centerContent paddingTop='10px'>
          <Searchbar />
          <List />
        </Container>
      </SearchContextProvider>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
