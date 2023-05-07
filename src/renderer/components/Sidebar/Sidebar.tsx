import TabList from '../Tab/Tab';
import { Container } from '../core';

function Sidebar() {
  return (
    <Container
      style={{ backgroundColor: '#08090D' }}
      width="250px"
      height="100vh"
      //debug
    >
      <TabList />
    </Container>
  );
}

export default Sidebar;
