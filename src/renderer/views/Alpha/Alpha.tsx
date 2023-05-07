import Sidebar from 'renderer/components/Sidebar/Sidebar';
import { Flex } from 'renderer/components/core';
import { TabContextProvider } from 'renderer/context/Alpha/TabContext';
import Main from './Main';
import Titlebar from 'renderer/components/Titlebar';
import { SidebarToggleProvider } from 'renderer/context/Alpha/SidebarToggleContext';
import Window from 'renderer/components/Window';

function Alpha() {
  return (
    <Window>
      <TabContextProvider>
        <SidebarToggleProvider>
          <Titlebar />
          <Flex>
            <Sidebar />
            <Main />
          </Flex>
        </SidebarToggleProvider>
      </TabContextProvider>
    </Window>
  );
}

export default Alpha;
