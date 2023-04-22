import styled from 'styled-components';

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  width: string;
  height: string;
};

const Button = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: none;
  outline: none;
  &:hover {
    border: none;
    outline: none;
  }
  &:focus {
    border: none;
    outline: none;
  }
`;

export default Button;
