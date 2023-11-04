import BoxBase, { BoxBaseProps } from "src/components/Boxs/BoxBase";

export interface BoxHorizonProps extends BoxBaseProps {}

const BoxHorizon = ({ children, sx, ...rest }: BoxHorizonProps) => {
    return (
        <BoxBase
            {...rest}
            sx={{
                display: "flex",
                alignItems: "center",
                ...sx,
            }}
        >
            {children}
        </BoxBase>
    );
};

export default BoxHorizon;
