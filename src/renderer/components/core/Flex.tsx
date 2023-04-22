import styled from 'styled-components';

export type FlexProps = {
  flexDirection?: 'row' | 'column';
  alignItems?:
    | 'normal'
    | 'stretch'
    | 'center'
    | 'start'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'self-start'
    | 'self-end'
    | 'baseline'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'unset';
  justifyContent?:
    | 'center'
    | 'start'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'left'
    | 'right'
    | 'normal'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'
    | 'iherit'
    | 'initial'
    | 'revert';
  flexWrap?:
    | 'nowrap'
    | 'wrap'
    | 'wrap-reverse'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'unset';
};

const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection ?? 'row'};
  align-items: ${(props) => props.alignItems ?? 'normal'};
  justify-content: ${(props) => props.justifyContent ?? 'start'};
  flex-wrap: ${(props) => props.flexWrap ?? 'no-wrap'};
`;

export default Flex;
