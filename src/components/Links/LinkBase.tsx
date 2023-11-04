import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";

const LinkBaseStyled = styled(Link)(() => ({
    textDecoration: "none",
    color: "inherit",
}));

export interface LinkBaseProps extends LinkProps {
    disabled?: boolean;
}

const LinkBase = ({ disabled, children, ...props }: LinkBaseProps) => {
    if (disabled) {
        return <>{children}</>;
    }

    return <LinkBaseStyled {...props}>{children}</LinkBaseStyled>;
};

export default LinkBase;
