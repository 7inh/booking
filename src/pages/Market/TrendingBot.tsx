import { Box, BoxProps } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import CarouselsBotList from "src/components/Carousels/CarouselsBotList/CarouselsBotList";
import useGetTrendingsBot from "src/hooks/useGetTrendingsBot";
import useTranslation from "src/hooks/utils/useTranslation";

export interface TrendingBotProps extends BoxProps {}

const TrendingBot = (props: TrendingBotProps) => {
    const t = useTranslation();
    const setSearchParams = useSearchParams()[1];

    const {
        data: bots,
        isLoading,
        isFetched,
    } = useGetTrendingsBot({
        numPage: 1,
        numRows: 6 * 3,
    });

    return (
        <Box {...props}>
            <CarouselsBotList
                title={t("page.kamiStore.trendingBot")}
                size={{
                    row: 2,
                    column: 3,
                    slice: isFetched ? Math.ceil(bots.length / (3 * 2)) : 3,
                }}
                bots={bots}
                isLoading={isLoading}
                onClickViewMore={() => {
                    setSearchParams({ view: "trending" });
                }}
            />
        </Box>
    );
};

export default TrendingBot;
