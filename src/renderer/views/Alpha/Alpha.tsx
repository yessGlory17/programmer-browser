import { Container } from 'renderer/components/core';
import Button from 'renderer/components/core/Button';

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
    </Container>
  );
}

export default Alpha;
