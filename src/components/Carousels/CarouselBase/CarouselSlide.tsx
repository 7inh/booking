import { Box, BoxProps } from "@mui/material";

export interface SlideProps extends BoxProps {
    children?: React.ReactNode;
}

const CarouselSlide = ({ children, sx, ...props }: SlideProps) => {
    return (
        <Box
            sx={{
                width: "100%",
                flexGrow: 1,
                flexShrink: 0,
                scrollSnapAlign: "start",
                ...sx,
            }}
            {...props}
        >
            {children}
        </Box>
    );
};

export default CarouselSlide;
