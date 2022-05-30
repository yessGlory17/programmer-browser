import { Container } from '@chakra-ui/react';

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import List from './components/List';
import Searchbar from './components/Searchbar';
import { SearchContextProvider } from './context/SearchContext';
import { TabContextProvider } from './context/TabContext';

const Hello = () => {
  return (
    <div id="container">
      {/* Searchbar */}
      <SearchContextProvider>
        <Container centerContent paddingTop="10px">
          <TabContextProvider>
            <Searchbar />
            <List />
          </TabContextProvider>
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
