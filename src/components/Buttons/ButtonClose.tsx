import { IconButton, IconButtonProps } from "@mui/material";
import BoxBase from "src/components/Boxs/BoxBase";
import Icon from "src/components/Icons/Icon";

export interface ButtonCloseProps extends Pick<IconButtonProps, "sx" | "onClick"> {
    size?: number;
    absolute?: boolean;
}

const ButtonClose = (props: ButtonCloseProps) => {
    const { size = 35, absolute, sx, ...rest } = props;

    return (
        <BoxBase
            sx={{
                position: absolute ? "absolute" : "relative",
                top: 0,
                right: 0,
                zIndex: 1,
            }}
        >
            <IconButton sx={sx} {...rest}>
                <Icon
                    icon="material-symbols:close"
                    sx={{
                        width: `${size}px`,
                        height: `${size}px`,
                    }}
                />
            </IconButton>
        </BoxBase>
    );
};

export default ButtonClose;
