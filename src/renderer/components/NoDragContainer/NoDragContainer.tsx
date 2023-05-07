import styled from 'styled-components';
import { Container } from '../core';

const NoDragContainer = styled(Container)`
  -webkit-app-region: no-drag;
  display: flex;
  flex-direction: row;
`;

export default NoDragContainer;
