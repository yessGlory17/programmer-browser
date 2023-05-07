import styled from 'styled-components';

export enum WindowActionType {
  close = '#F11515',
  minimize = '#F1C115',
  maximize = '#15BCF1',
}

type WindowActionProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  actionType: WindowActionType;
};

const WindowAction = styled('button')<WindowActionProps>`
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background-color: ${(props) => props.actionType};
`;

export default WindowAction;
