import styled from "styled-components";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
    width?: string;
    height?: string;
    debug?: boolean;
}

const Container = styled.div<ContainerProps>`
    width: ${props => props.width};
    height: ${props => props.height};
    ${({debug}) => debug && `
    border:1px solid red;
    `}

    ${props => props.style && `style: ${props.style}`}
`;

export default Container;