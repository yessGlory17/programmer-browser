import { Flex, Padding } from 'renderer/components/core';
import Button, { ButtonProps } from 'renderer/components/core/Button';

type TextAndIconButtonType = {
  buttonProps: Omit<ButtonProps, 'width' | 'height'>;
  iconProps?: React.HTMLAttributes<SVGElement>;
  textProps?: React.HTMLAttributes<HTMLParagraphElement>;
  text: string;
};

function withTextAndIconButton<P>(WrappedComponent: React.ComponentType) {
  function IconButton(props: P & TextAndIconButtonType) {
    const { buttonProps, iconProps, text, textProps } = props;
    return (
      <Button {...buttonProps} width="auto" height="auto">
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          flexWrap="wrap"
        >
          <Padding right="10px" top="2px" left="2px" bottom="2px">
            <WrappedComponent {...iconProps} />
          </Padding>
          <Padding right="2px" top="2px" left="2px" bottom="2px">
            <p {...textProps}>{text}</p>
          </Padding>
        </Flex>
      </Button>
    );
  }
  return IconButton;
}

export default withTextAndIconButton;
