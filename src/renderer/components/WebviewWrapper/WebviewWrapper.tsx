import styled from 'styled-components';
import { Container } from '../core';

type WebviewWrapperProps = {
  passive: boolean;
  sidebarOpen: boolean;
};

const WebviewWrapper = styled(Container)<WebviewWrapperProps>`
  width: ${(props) =>
    props.sidebarOpen ? 'calc(100vw - 300px)' : 'calc(100vw - 50px)'};
  height: calc(100vh - 70px);
  border-radius: 20px;
  background-color: white;
  display: ${(props) => (props.passive ? 'none' : 'block')};
  margin-left: 30px;
`;

export default WebviewWrapper;
