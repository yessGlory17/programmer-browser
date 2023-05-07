import Sidebar from 'renderer/components/Sidebar/Sidebar';
import { Container, Flex } from 'renderer/components/core';
import { TabContextProvider } from 'renderer/context/Alpha/TabContext';
import Main from './Main';
import Titlebar from 'renderer/components/Titlebar';
import { SidebarToggleProvider } from 'renderer/context/Alpha/SidebarToggleContext';

function Alpha() {
  return (
    <Container
      width="100vw"
      height="100vh"
      //debug
      style={{ backgroundColor: '#121219', borderRadius: '10px' }}
    >
      <TabContextProvider>
        <SidebarToggleProvider>
          <Titlebar />
          <Flex>
            <Sidebar />
            <Main />
          </Flex>
        </SidebarToggleProvider>
      </TabContextProvider>
    </Container>
  );
}

export default Alpha;
