import { Box, BoxProps, IconButton } from "@mui/material";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { memo } from "react";

const _sx = {
    iconButton: {
        boxShadow:
            "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)",
    },
};

export interface CarouselNavigationProps extends BoxProps {
    color?: string;
    onClickNext?: () => void;
    onClickPrev?: () => void;
    disableGoToPrev?: boolean;
    disableGoToNext?: boolean;
}

const CarouselNavigation = ({
    color,
    onClickPrev,
    onClickNext,
    disableGoToPrev,
    disableGoToNext,
    sx,
    ...props
}: CarouselNavigationProps) => {
    return (
        <Box
            {...props}
            sx={{
                display: "flex",
                gap: "8px",
                ...sx,
            }}
        >
            <IconButton
                sx={{
                    ..._sx.iconButton,
                }}
                onClick={onClickPrev}
                disabled={disableGoToPrev}
            >
                <NavigateBeforeRoundedIcon
                    sx={{
                        width: "20px",
                        height: "20px",
                        color: disableGoToPrev ? "default" : color,
                    }}
                />
            </IconButton>
            <IconButton sx={_sx.iconButton} onClick={onClickNext} disabled={disableGoToNext}>
                <NavigateNextRoundedIcon
                    sx={{
                        width: "20px",
                        height: "20px",
                        color: disableGoToNext ? "default" : color,
                    }}
                />
            </IconButton>
        </Box>
    );
};

export default memo(CarouselNavigation);
