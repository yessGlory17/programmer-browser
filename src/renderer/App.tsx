import { Container } from '@chakra-ui/react';
import { useState } from 'react';

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import List from './components/List';
import Searchbar from './components/Searchbar';
import SearchEngineModal from './components/Settings/SearchEngineModal';
import { SearchContextProvider } from './context/SearchContext';
import { TabContextProvider } from './context/TabContext';
import ShortcutKeys from './hooks/shortcut/ShortcutKeys';
import useHotkeys from './hooks/shortcut/useHotkeys';

const Hello = () => {
  //Shorcut: Window Move
  useHotkeys(`${ShortcutKeys.CTRL}+${ShortcutKeys.LeftArrow}`, () => {
    window.electron.ipcRenderer.sendMessage('window-move', 'topLeft');
  });

  useHotkeys(`${ShortcutKeys.CTRL}+${ShortcutKeys.RightArrow}`, () => {
    window.electron.ipcRenderer.sendMessage('window-move', 'topRight');
  });

  return (
    <div id="container">
      <SearchContextProvider>
        <Container centerContent paddingTop="10px">
          <TabContextProvider>
            <Searchbar />
            <List />
            <SearchEngineModal />
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
