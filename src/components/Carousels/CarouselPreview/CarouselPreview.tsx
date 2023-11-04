import { Box, BoxProps, CardMedia, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CarouselIndicator from "src/components/Carousels/CarouselBase/CarouselIndicator";
import CarouselNavigation from "src/components/Carousels/CarouselBase/CarouselNavigation";
import ImageViewer from "src/components/ImageViewer/ImageViewer";
import useTranslation from "src/hooks/utils/useTranslation";
import { v4 as uuidv4 } from "uuid";

export interface CarouselPreviewProps extends BoxProps {
    previewImg: string[];
}

const MOBILE_SCREEN_WIDTH = 262;
const SLICE_GAP = 8;

const CarouselPreview = (props: CarouselPreviewProps) => {
    const { previewImg, ...rest } = props;

    const t = useTranslation();

    const [currentIdx, setCurrentIdx] = useState(0);
    const [openImageViewer, setOpenImageViewer] = useState(false);
    const [currentSelectedIdx, setCurrentSelectedIdx] = useState(0);
    const [sliceLength, setSliceLength] = useState(1);

    const slideRef = useRef<HTMLDivElement>(null);

    const MOBILE_SCREEN_NUMBER = useMemo(() => previewImg.length, [previewImg.length]);

    const handleChangeIdx = useCallback(
        (idx: number) => {
            if (slideRef.current && idx !== currentIdx) {
                const redundant = slideRef.current.scrollLeft % MOBILE_SCREEN_WIDTH;
                slideRef.current.scrollBy({
                    left:
                        MOBILE_SCREEN_WIDTH * (idx - currentIdx) -
                        (idx > currentIdx ? redundant : -redundant),
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

    const renderIndicator = useMemo(() => {
        return (
            <CarouselIndicator
                length={sliceLength}
                currentIdx={currentIdx}
                onChangeIdx={(idx) => handleChangeIdx(idx)}
            />
        );
    }, [sliceLength, currentIdx, handleChangeIdx]);

    const renderNavigation = useMemo(() => {
        return (
            <CarouselNavigation
                onClickPrev={handleGoToPrevSlide}
                onClickNext={handleGoToNextSlide}
                disableGoToPrev={currentIdx === 0}
                disableGoToNext={currentIdx === sliceLength - 1}
            />
        );
    }, [sliceLength, currentIdx, handleGoToNextSlide, handleGoToPrevSlide]);

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
                    gap: `${SLICE_GAP}px`,
                    alignItems: "center",
                }}
                onScroll={(e) => {
                    const target = e.target as HTMLDivElement;
                    const scrollLeft = target.scrollLeft;
                    const clientWidth = target.clientWidth;
                    const scrollWidth = target.scrollWidth;

                    if (scrollLeft + clientWidth >= scrollWidth) {
                        setCurrentIdx(sliceLength - 1);
                    } else {
                        setCurrentIdx(Math.floor(scrollLeft / MOBILE_SCREEN_WIDTH));
                    }
                }}
            >
                {previewImg.map((imgSrc, index) => (
                    <Box
                        key={uuidv4()}
                        sx={{
                            margin: "auto",
                            scrollSnapAlign: "start",
                            scrollBehavior: "smooth",
                            bgcolor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                            flexShrink: 0,
                            width: MOBILE_SCREEN_WIDTH,
                            height: (MOBILE_SCREEN_WIDTH * 16) / 9,
                            border: "5px solid #F4F4F4",
                            borderRadius: "16px",
                            overflow: "hidden",
                        }}
                        onClick={() => {
                            setCurrentSelectedIdx(index);
                            setOpenImageViewer(true);
                        }}
                    >
                        <CardMedia
                            component="img"
                            src={imgSrc}
                            sx={{
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </Box>
                ))}
            </Box>
        );
    }, [sliceLength, previewImg]);

    useEffect(() => {
        if (!slideRef.current) {
            return;
        }

        const isOverflow =
            MOBILE_SCREEN_NUMBER * MOBILE_SCREEN_WIDTH <
            slideRef.current.scrollWidth - SLICE_GAP * (MOBILE_SCREEN_NUMBER - 1);

        const trueSliceLength = !isOverflow
            ? 1
            : 1 +
              Math.ceil(
                  (slideRef?.current.scrollWidth - slideRef?.current.clientWidth) /
                      MOBILE_SCREEN_WIDTH
              );

        if (sliceLength !== trueSliceLength) {
            setSliceLength(trueSliceLength);
        }
    }, [MOBILE_SCREEN_NUMBER, sliceLength]);

    return (
        <Box {...rest}>
            <ImageViewer
                key={currentSelectedIdx}
                open={openImageViewer}
                currentSelectedIdx={currentSelectedIdx}
                images={previewImg}
                onClose={() => {
                    setOpenImageViewer(false);
                    setCurrentSelectedIdx(-1);
                }}
            />
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.5}>
                <Typography
                    sx={{
                        fontSize: "22px",
                        fontWeight: 600,
                        color: "#1B1A57",
                    }}
                >
                    {t("page.kamiStore.previews")}
                </Typography>
                {renderIndicator}
                {renderNavigation}
            </Stack>
            <Box>{renderSlices}</Box>
        </Box>
    );
};

export default CarouselPreview;
