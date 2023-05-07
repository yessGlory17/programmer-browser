import { useContext } from 'react';
import TabList from '../Tab/Tab';
import { Container } from '../core';
import { SidebarToggleContext } from 'renderer/context/Alpha/SidebarToggleContext';
import styled from 'styled-components';

type SidebarContainerProps = {
  sidebarOpen: boolean;
};

const SidebarContainer = styled(Container)<SidebarContainerProps>`
  display: ${(props) => (props.sidebarOpen ? 'block' : 'none')};
  width: 250px;
  height: 100vh;
  background-color: #08090d;
  transition: display 3s;
`;

function Sidebar() {
  const { isOpen } = useContext(SidebarToggleContext);
  return (
    <SidebarContainer sidebarOpen={isOpen ?? true}>
      <TabList />
    </SidebarContainer>
  );
}

export default Sidebar;
