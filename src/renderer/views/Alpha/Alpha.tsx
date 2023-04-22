import { DrawerIcon } from 'renderer/components/Icons';
import { Container } from 'renderer/components/core';
import Button from 'renderer/components/core/Button';
import withIconButton from 'renderer/hoc/withIconButton';

const DrawerButton = withIconButton(DrawerIcon);

function Alpha() {
  return (
    <Container
      width="100vw"
      height="100vh"
      debug
      style={{ backgroundColor: 'red' }}
    >
      <Button
        width="100px"
        height="30px"
        onClick={() => alert('test')}
        style={{ border: '1px solid green' }}
      >
        Styled Button
      </Button>
      <button style={{ width: '100px', height: '30px' }}>Normal Button</button>
      <DrawerButton
        buttonProps={{
          width: '20px',
          height: '20px',
          onClick: () => alert('icon button'),
        }}
      />
    </Container>
  );
}

export default Alpha;
