import styled from 'styled-components';
import { Container, Flex, Padding } from '../core';
import { DrawerIcon } from '../Icons';
import withIconButton from 'renderer/hoc/withIconButton';
import { useContext, useState } from 'react';
import { TabContext } from 'renderer/context/Alpha/TabContext';

enum WindowActionType {
  close = '#F11515',
  minimize = '#F1C115',
  maximize = '#15BCF1',
}

type WindowActionProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  actionType: WindowActionType;
};

const DrawerToggle = withIconButton(DrawerIcon);

const WindowAction = styled('button')<WindowActionProps>`
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background-color: ${(props) => props.actionType};
`;

const TitlebarWrapper = styled(Container)`
  width: 250px;
  height: 50px;
  -webkit-app-region: drag;
`;

const NoDragContainer = styled(Container)`
  -webkit-app-region: no-drag;
  background-color: green;
`;

function TitleActions() {
  const debug = false;
  return (
    <TitlebarWrapper debug={debug}>
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
                onClick: () => alert('toggle drawer'),
              }}
            />
          </Padding>
        </NoDragContainer>
      </Flex>
    </TitlebarWrapper>
  );
}

const Search = styled('input')`
  width: 400px;
  height: 35px;
  background-color: rgba(17, 17, 17, 0.5);
  padding-left: 10px;
  border-radius: 5px;
  border: 1px solid grey;
  &:focus {
    outline: none;
  }
`;

function TabActions() {
  const { search, currentTab } = useContext(TabContext);

  const onChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('search input: ', event.currentTarget.value);
      console.warn('pressed enter key');
      search?.(event.currentTarget.value);
    }
  };

  return (
    <Container width="calc(100vw - 250px)" height="50px">
      <Flex justifyContent="center" alignItems="center">
        <NoDragContainer>
          <Search
            type="search"
            placeholder="Search"
            //value={currentTab?.keyword}
            onKeyDown={onChange}
          />
        </NoDragContainer>
      </Flex>
    </Container>
  );
}

const TitlebarContainer = styled(Container)`
  width: 100vw;
  height: 50px;
  -webkit-app-region: drag;
`;

function Titlebar() {
  return (
    <TitlebarContainer debug>
      <Flex>
        <TitleActions />
        <TabActions />
      </Flex>
    </TitlebarContainer>
  );
}

export default Titlebar;
