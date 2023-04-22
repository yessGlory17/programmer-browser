import { Flex, Padding } from 'renderer/components/core';
import Button, { ButtonProps } from 'renderer/components/core/Button';

type TextAndIconButtonType = {
  buttonProps: Omit<ButtonProps, 'width' | 'height'>;
  iconProps?: React.HTMLAttributes<SVGElement>;
  text: string;
};

function withTextAndIconButton<P>(WrappedComponent: React.ComponentType) {
  function IconButton(props: P & TextAndIconButtonType) {
    const { buttonProps, iconProps, text } = props;
    return (
      <Button {...buttonProps} width="auto" height="auto">
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Padding right="10px" top="2px" left="2px" bottom="2px">
            <WrappedComponent {...iconProps} />
          </Padding>
          <Padding right="2px" top="2px" left="2px" bottom="2px">
            <p>{text}</p>
          </Padding>
        </Flex>
      </Button>
    );
  }
  return IconButton;
}

export default withTextAndIconButton;
