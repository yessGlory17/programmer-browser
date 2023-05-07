import { Flex, Padding } from '../core';
import { DrawerIcon } from '../Icons';
import withIconButton from 'renderer/hoc/withIconButton';
import { useContext } from 'react';
import { SidebarToggleContext } from 'renderer/context/Alpha/SidebarToggleContext';
import WindowAction, { WindowActionType } from '../WindowAction';
import TitlebarWrapper from '../TitlebarWrapper';
import NoDragContainer from '../NoDragContainer';

const DrawerToggle = withIconButton(DrawerIcon);

function TitleActions() {
  const { toggle, isOpen } = useContext(SidebarToggleContext);
  const debug = false;
  return (
    <TitlebarWrapper sidebarOpen={isOpen ?? true} debug={debug}>
      <Flex flexDirection="row" justifyContent="space-between">
        <NoDragContainer width="75px" height="25px" debug={debug}>
          <Flex>
            <Padding left="5px" right="5px" top="5px">
              <WindowAction actionType={WindowActionType.close} />
            </Padding>
            <Padding left="5px" right="5px" top="5px">
              <WindowAction actionType={WindowActionType.minimize} />
            </Padding>
            <Padding left="5px" right="5px" top="5px">
              <WindowAction actionType={WindowActionType.maximize} />
            </Padding>
          </Flex>
        </NoDragContainer>
        <NoDragContainer>
          <Padding top="5px">
            <DrawerToggle
              buttonProps={{
                width: '24px',
                height: '24px',
                onClick: toggle,
              }}
            />
          </Padding>
        </NoDragContainer>
      </Flex>
    </TitlebarWrapper>
  );
}

export default TitleActions;
