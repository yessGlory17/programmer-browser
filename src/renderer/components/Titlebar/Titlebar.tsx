import styled from 'styled-components';
import { Container, Flex, Margin, Padding } from '../core';
import { DrawerIcon, LeftArrow, RefreshIcon, RightArrow } from '../Icons';
import withIconButton from 'renderer/hoc/withIconButton';
import { useContext } from 'react';
import { TabContext } from 'renderer/context/Alpha/TabContext';
import ButtonGroup from '../core/ButtonGroup';

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
  display: flex;
  flex-direction: row;
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
  background-color: #20222d;
  padding-left: 10px;
  border-radius: 5px;
  border: 1px solid #20222d;
  &:focus {
    outline: none;
    background-color: #121219;
  }
`;

const Back = withIconButton(LeftArrow);
const Forward = withIconButton(RightArrow);
const Refresh = withIconButton(RefreshIcon);

function TabActions() {
  const { search, currentTab } = useContext(TabContext);

  const back = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (currentTab?.webviewRef.current?.canGoBack())
      currentTab?.webviewRef.current.goBack();
  };

  const forward = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (currentTab?.webviewRef.current?.canGoForward())
      currentTab?.webviewRef.current?.goForward();
  };

  const refresh = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (currentTab?.webviewRef.current?.isLoading()) {
      currentTab?.webviewRef.current?.stop();
    } else {
      currentTab?.webviewRef.current?.reload();
    }
  };

  const onChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('search input: ', event.currentTarget.value);
      console.warn('pressed enter key');
      search?.(event.currentTarget.value);
    }
  };

  const url = () => {
    if (currentTab?.webviewRef?.current) {
      return currentTab?.webviewRef?.current.getURL();
    }
    return '';
  };

  return (
    <Container width="calc(100vw - 250px)" height="50px">
      <Flex justifyContent="center" alignItems="center">
        <NoDragContainer>
          <Margin right="10px">
            <ButtonGroup width="70px" height="35px">
              <Back
                buttonProps={{
                  width: '35px',
                  height: '35px',
                  style: {
                    backgroundColor: '#20222d',
                    //border: '1px solid red',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  onClick: back,
                }}
              />
              <Forward
                buttonProps={{
                  width: '35px',
                  height: '35px',
                  style: {
                    backgroundColor: '#20222d',
                    //border: '1px solid red',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  onClick: forward,
                }}
              />
            </ButtonGroup>
          </Margin>
          <Search
            type="search"
            placeholder="Search"
            //value={currentTab?.keyword}
            //defaultValue={url()}
            onKeyDown={onChange}
          />
          <Margin left="10px">
            <Refresh
              buttonProps={{
                width: '35px',
                height: '35px',
                style: {
                  backgroundColor: '#20222d',
                  //border: '1px solid red',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '5px',
                },
                onClick: refresh,
              }}
            />
          </Margin>
        </NoDragContainer>
      </Flex>
    </Container>
  );
}

const TitlebarContainer = styled(Container)`
  width: 100vw;
  height: 50px;
  -webkit-app-region: drag;
  background-color: #121219;
`;

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
