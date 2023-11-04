import { Box, BoxProps } from "@mui/material";

export interface CarouselIndicatorProps extends BoxProps {
    length: number;
    currentIdx: number;
    onChangeIdx?: (idx: number) => void;
}

const CarouselIndicator = (props: CarouselIndicatorProps) => {
    const { length, currentIdx, onChangeIdx, ...rest } = props;

    return (
        <Box {...rest} display="flex" gap={1}>
            {Array.from({ length }).map((_, index) => (
                <Box
                    key={index}
                    sx={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        bgcolor: index === currentIdx ? "primary.main" : "grey.300",
                        transition: "all 0.3s",
                        cursor: "pointer",
                    }}
                    onClick={() => onChangeIdx?.(index)}
                />
            ))}
        </Box>
    );
};

export default CarouselIndicator;
