import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Box, BoxProps, Typography } from "@mui/material";
import chunk from "lodash/chunk";
import { useCallback, useMemo, useRef, useState } from "react";
import CarouselIndicator from "src/components/Carousels/CarouselBase/CarouselIndicator";
import CarouselNavigation from "src/components/Carousels/CarouselBase/CarouselNavigation";
import CarouselSlide from "src/components/Carousels/CarouselBase/CarouselSlide";
import BotList from "src/components/Carousels/CarouselsBotList/BotList";
import useTranslation from "src/hooks/utils/useTranslation";
import { v4 as uuidv4 } from "uuid";

export interface CarouselsBotListProps extends Omit<BoxProps, "title"> {
    title: string | React.ReactNode;
    size: {
        row: number;
        column: number;
        slice: number;
    };
    bots: any[];
    isLoading?: boolean;
    isShowViewMore?: boolean;
    onClickViewMore?: () => void;
}

const CarouselsBotList = ({
    title,
    size,
    bots,
    isLoading,
    isShowViewMore,
    onClickViewMore,
    sx,
    ...props
}: CarouselsBotListProps) => {
    const { row, column, slice } = size;

    const t = useTranslation();

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

    const renderTitle = useMemo(() => {
        return (
            <Box
                sx={{
                    display: "flex",
                    color: "primary.main",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
                onClick={() => {
                    if (!isShowViewMore) onClickViewMore?.();
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        color: "black",
                        height: "fit-content",
                        alignItems: "center",
                        cursor: "pointer",
                        width: "fit-content",
                        mx: 4,
                    }}
                >
                    {typeof title === "string" ? (
                        <Typography
                            sx={{
                                fontSize: "20px",
                                fontWeight: 600,
                                lineHeight: "22px",
                            }}
                        >
                            {title}
                        </Typography>
                    ) : (
                        title
                    )}
                    {isShowViewMore ? null : <ChevronRightRoundedIcon />}
                </Box>
                {isShowViewMore ? (
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#3E8C6C",
                            lineHeight: "20px",
                            textDecoration: "underline",
                            cursor: "pointer",
                            px: 4,
                        }}
                        onClick={onClickViewMore}
                    >
                        {t("common.viewMore")}
                    </Typography>
                ) : null}
            </Box>
        );
    }, [isShowViewMore, onClickViewMore, t, title]);

    const renderSlices = useMemo(() => {
        const slicedBots = chunk(bots, row * column);
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
                {Array.from({ length: slice }).map((_, idx) => (
                    <CarouselSlide
                        key={uuidv4()}
                        sx={{
                            boxSizing: "border-box",
                            py: 2.5,
                            px: 4,
                        }}
                    >
                        <BotList
                            bots={slicedBots[idx]}
                            row={row}
                            column={column}
                            isLoading={isLoading}
                        />
                    </CarouselSlide>
                ))}
            </Box>
        );
    }, [bots, column, isLoading, row, slice]);

    const renderIndicator = useMemo(() => {
        return (
            <CarouselIndicator
                length={slice}
                currentIdx={currentIdx}
                onChangeIdx={(idx) => handleChangeIdx(idx)}
            />
        );
    }, [currentIdx, handleChangeIdx, slice]);

    const renderNavigation = useMemo(() => {
        return (
            <CarouselNavigation
                onClickPrev={handleGoToPrevSlide}
                onClickNext={handleGoToNextSlide}
                disableGoToPrev={currentIdx === 0}
                disableGoToNext={currentIdx === slice - 1}
            />
        );
    }, [currentIdx, handleGoToNextSlide, handleGoToPrevSlide, slice]);

    return (
        <Box sx={{ ...sx }} {...props}>
            {renderTitle}
            {renderSlices}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 4,
                }}
            >
                {renderIndicator}
                {renderNavigation}
            </Box>
        </Box>
    );
};

export default CarouselsBotList;
