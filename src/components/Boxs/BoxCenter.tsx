import BoxBase, { BoxBaseProps } from "src/components/Boxs/BoxBase";

export interface BoxCenterProps extends BoxBaseProps {}

const BoxCenter = (props: BoxCenterProps) => {
    const { children, sx, ...rest } = props;

    return (
        <BoxBase
            {...rest}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...sx,
            }}
        >
            {children}
        </BoxBase>
    );
};

export default BoxCenter;
