import Button, { ButtonProps } from 'renderer/components/core/Button';

type IconButtonType = {
  buttonProps: ButtonProps;
  iconProps?: React.HTMLAttributes<SVGElement>;
};

function withIconButton<P>(WrappedComponent: React.ComponentType) {
  function IconButton(props: P & IconButtonType) {
    const { buttonProps, iconProps } = props;
    return (
      <Button {...buttonProps}>
        <WrappedComponent {...iconProps} />
      </Button>
    );
  }
  return IconButton;
}

export default withIconButton;
