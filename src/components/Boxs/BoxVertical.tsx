import BoxBase, { BoxBaseProps } from "src/components/Boxs/BoxBase";

export interface BoxVerticalProps extends BoxBaseProps {
    children?: React.ReactNode;
}

const BoxVertical = ({ children, sx, ...rest }: BoxVerticalProps) => {
    return (
        <BoxBase
            {...rest}
            sx={{
                display: "flex",
                flexDirection: "column",
                ...sx,
            }}
        >
            {children}
        </BoxBase>
    );
};

export default BoxVertical;
