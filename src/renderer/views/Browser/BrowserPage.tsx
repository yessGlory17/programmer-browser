import { Container } from '@chakra-ui/react';
import '../../App.css';
import List from '../../components/TabList/TabList';
import Searchbar from '../../components/Searchbar/Searchbar';
import SearchEngineModal from '../../components/Settings/SearchEngineModal';
import { SearchContextProvider } from '../../context/SearchContext';
import { TabContextProvider } from '../../context/TabContext';
import ShortcutKeys from '../../hooks/shortcut/ShortcutKeys';
import useHotkeys from '../../hooks/shortcut/useHotkeys';

const BrowserPage = () => {
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

export default BrowserPage;