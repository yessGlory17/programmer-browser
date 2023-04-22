import styled from 'styled-components';

export type PaddingProps = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

const Padding = styled.div<PaddingProps>`
  padding-top: ${(props) => props.top};
  padding-bottom: ${(props) => props.bottom};
  padding-left: ${(props) => props.left};
  padding-right: ${(props) => props.right};
`;

export default Padding;
