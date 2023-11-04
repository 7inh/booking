import { Box, BoxProps } from "@mui/material";
import { useCallback, useMemo, useRef, useState } from "react";
import CarouselIndicator from "src/components/Carousels/CarouselBase/CarouselIndicator";
import CarouselNavigation from "src/components/Carousels/CarouselBase/CarouselNavigation";
import CarouselSlide from "src/components/Carousels/CarouselBase/CarouselSlide";
import BroadCast from "src/components/Carousels/CarouselBroadCast/BroadCast";
import { v4 as uuidv4 } from "uuid";

export interface CarouselBroadCastProps extends BoxProps {}

const SLICE_LENGTH = 4;

const CarouselBroadCast = ({ sx, ...props }: CarouselBroadCastProps) => {
    const [currentIdx, setCurrentIdx] = useState(0);

    const slideRef = useRef<HTMLDivElement>(null);

    const handleChangeIdx = useCallback(
        (idx: number) => {
            if (slideRef.current) {
                slideRef.current.scrollBy({
                    left: (idx - currentIdx) * slideRef.current.clientWidth,
                    behavior: "smooth",
                });
            }
        },
        [currentIdx]
    );

    const handleGoToPrevSlide = useCallback(() => {
        handleChangeIdx(currentIdx - 1);
    }, [currentIdx, handleChangeIdx]);

    const handleGoToNextSlide = useCallback(() => {
        handleChangeIdx(currentIdx + 1);
    }, [currentIdx, handleChangeIdx]);

    const renderSlices = useMemo(() => {
        return (
            <Box
                ref={slideRef}
                sx={{
                    display: "flex",
                    overflow: "auto",
                    scrollSnapType: "x mandatory",
                    scrollBehavior: "smooth",
                    "::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
                onScroll={(e) => {
                    setCurrentIdx(
                        Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth)
                    );
                }}
            >
                {Array.from({ length: SLICE_LENGTH }).map((_, idx) => (
                    <CarouselSlide key={uuidv4()}>
                        <BroadCast currentIdx={idx} />
                    </CarouselSlide>
                ))}
            </Box>
        );
    }, []);

    const renderIndicator = useMemo(() => {
        return (
            <CarouselIndicator
                length={SLICE_LENGTH}
                currentIdx={currentIdx}
                onChangeIdx={(idx) => handleChangeIdx(idx)}
            />
        );
    }, [currentIdx, handleChangeIdx]);

    const renderNavigation = useMemo(() => {
        return (
            <CarouselNavigation
                onClickPrev={handleGoToPrevSlide}
                onClickNext={handleGoToNextSlide}
                disableGoToPrev={currentIdx === 0}
                disableGoToNext={currentIdx === SLICE_LENGTH - 1}
                color="white"
            />
        );
    }, [currentIdx, handleGoToNextSlide, handleGoToPrevSlide]);

    return (
        <Box sx={{ ...sx }} {...props} position="relative" borderRadius="16px" overflow="hidden">
            {renderSlices}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    "& > :first-of-type": {
                        ml: 2,
                    },
                }}
            >
                {renderIndicator}
                {renderNavigation}
            </Box>
        </Box>
    );
};

export default CarouselBroadCast;
