import styled from 'styled-components';

export type MarginProps = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

const Margin = styled.div<MarginProps>`
  margin-top: ${(props) => props.top};
  margin-bottom: ${(props) => props.bottom};
  margin-left: ${(props) => props.left};
  margin-right: ${(props) => props.right};
`;

export default Margin;
