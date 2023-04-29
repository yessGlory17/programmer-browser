import { Webview } from 'renderer/components/Webview';
import { Container } from 'renderer/components/core';
import { useContext } from 'react';
import { TabContext } from 'renderer/context/Alpha/TabContext';

function Main() {
  const { currentTab } = useContext(TabContext);
  return (
    <Container
      width="calc(100vw - 250px)"
      height="100vh"
      debug
      style={{ backgroundColor: 'cyan' }}
    >
      <Webview
        url="https://www.google.com/search?q="
        viewRef={currentTab?.webviewRef ?? null}
        width="100%"
        height="100%"
      />
    </Container>
  );
}

export default Main;
