import { Flex } from '../core';
import TabActions from '../TabActions';
import TitleActions from '../TitleActions';
import TitlebarContainer from '../TitlebarContainer';

function Titlebar() {
  return (
    <TitlebarContainer>
      <Flex>
        <TitleActions />
        <TabActions />
      </Flex>
    </TitlebarContainer>
  );
}

export default Titlebar;
