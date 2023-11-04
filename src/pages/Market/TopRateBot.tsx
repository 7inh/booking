import { Box, BoxProps } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import CarouselsBotList from "src/components/Carousels/CarouselsBotList/CarouselsBotList";
import useGetTopRateBot from "src/hooks/useGetTopRateBot";
import useTranslation from "src/hooks/utils/useTranslation";

export interface TopRateBotProps extends BoxProps {}

const TopRateBot = (props: TopRateBotProps) => {
    const t = useTranslation();
    const setSearchParams = useSearchParams()[1];

    const { data: bots, isLoading, isFetched } = useGetTopRateBot({});

    return (
        <Box {...props}>
            <CarouselsBotList
                title={t("page.kamiStore.topRateBot")}
                size={{
                    row: 1,
                    column: 3,
                    slice: isFetched ? Math.ceil(bots.length / 3) : 3,
                }}
                bots={bots}
                isLoading={isLoading}
                onClickViewMore={() => {
                    setSearchParams({ view: "top-rate" });
                }}
            />
        </Box>
    );
};

export default TopRateBot;
