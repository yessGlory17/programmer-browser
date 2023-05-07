import styled from 'styled-components';
import Flex from './Flex';

type ButtonGroupContainerProps = {
  width?: string;
  height?: string;
};

const ButtonGroupContainer = styled(Flex)<ButtonGroupContainerProps>`
  width: ${(props) => props.width ?? 'auto'};
  height: ${(props) => props.height ?? 'auto'};
  & > button {
    border: 1px solid #191922;
  }
  & > :first-child {
    border-radius: 5px 0px 0px 5px;
  }

  & > :last-child {
    border-radius: 0px 5px 5px 0px;
  }

  & > :not(:last-child) {
  }
`;

type ButtonGroupProps = {
  width?: string;
  height?: string;
  children: JSX.Element[];
};

function ButtonGroup({ width, height, children }: ButtonGroupProps) {
  return (
    <ButtonGroupContainer width={width} height={height}>
      {children?.map((button: JSX.Element) => button)}
    </ButtonGroupContainer>
  );
}

export default ButtonGroup;
