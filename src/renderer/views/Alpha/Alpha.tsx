import { DrawerIcon } from 'renderer/components/Icons';
import { Container } from 'renderer/components/core';
import Button from 'renderer/components/core/Button';
import withIconButton from 'renderer/hoc/withIconButton';
import withTextAndIconButton from 'renderer/hoc/withTextAndIconButton';

const DrawerButton = withTextAndIconButton(DrawerIcon);

function Alpha() {
  return (
    <Container
      width="100vw"
      height="100vh"
      debug
      style={{ backgroundColor: 'red' }}
    >
      <DrawerButton
        text="Test Icon Button"
        buttonProps={{
          style: { border: '1px solid green' },
          onClick: () => alert('icon button'),
        }}
      />
    </Container>
  );
}

export default Alpha;
