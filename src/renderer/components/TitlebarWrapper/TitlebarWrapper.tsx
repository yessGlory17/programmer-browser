import styled from 'styled-components';
import { Container } from '../core';

type TitlebarWrapperProps = {
  sidebarOpen: boolean;
};

const TitlebarWrapper = styled(Container)<TitlebarWrapperProps>`
  width: 250px;
  height: 50px;
  background-color: ${(props) =>
    props.sidebarOpen ? '#08090d' : 'transparent'};
  -webkit-app-region: drag;
`;

export default TitlebarWrapper;
