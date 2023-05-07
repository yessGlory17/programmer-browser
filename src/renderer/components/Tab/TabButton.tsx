import styled from 'styled-components';

type TabButtonProps = {
  active: boolean;
};

const TabButton = styled('button')<TabButtonProps>`
  width: 250px;
  height: 30px;
  background-color: ${(props) => (props.active ? '#2599FF' : 'transparent')};
  border-radous: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  text-align: left;
`;
export default TabButton;
