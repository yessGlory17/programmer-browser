import Sidebar from 'renderer/components/Sidebar/Sidebar';
import { Container, Flex } from 'renderer/components/core';
import { TabContextProvider } from 'renderer/context/Alpha/TabContext';
import Main from './Main';

function Alpha() {
  return (
    <Container
      width="100vw"
      height="100vh"
      debug
      style={{ backgroundColor: 'rgba(17,17,17,0.95)' }}
    >
      <TabContextProvider>
        <Flex>
          <Sidebar />
          <Main />
        </Flex>
      </TabContextProvider>
    </Container>
  );
}

export default Alpha;
