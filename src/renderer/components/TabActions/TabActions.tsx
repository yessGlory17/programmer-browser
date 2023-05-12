import { Container, Flex, Margin } from '../core';
import { LeftArrow, RefreshIcon, RightArrow } from '../Icons';
import withIconButton from 'renderer/hoc/withIconButton';
import { useContext } from 'react';
import { TabContext } from 'renderer/context/Alpha/TabContext';
import ButtonGroup from '../core/ButtonGroup';
import NoDragContainer from '../NoDragContainer';
import Search from '../Search';

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

  //   const url = () => {
  //     if (currentTab?.webviewRef?.current) {
  //       return currentTab?.webviewRef?.current.getURL();
  //     }
  //     return '';
  //   };

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
          <Search type="text" placeholder="Search" onKeyDown={onChange} />
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

export default TabActions;
