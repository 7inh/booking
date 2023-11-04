import { Box, BoxProps } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import CarouselsBotList from "src/components/Carousels/CarouselsBotList/CarouselsBotList";
import useGetMarketAll from "src/hooks/useGetMarketAll";
import useTranslation from "src/hooks/utils/useTranslation";

export interface NewBotProps extends BoxProps {}

const NewBot = (props: NewBotProps) => {
    const t = useTranslation();

    const {
        data: bots,
        isLoading,
        isFetched,
    } = useGetMarketAll({
        numPage: 1,
        numRows: 18,
    });
    const setSearchParams = useSearchParams()[1];

    return (
        <Box {...props}>
            <CarouselsBotList
                title={t("page.kamiStore.newBot")}
                size={{
                    row: 2,
                    column: 3,
                    slice: isFetched ? Math.ceil(bots.length / (3 * 2)) : 3,
                }}
                bots={bots}
                isLoading={isLoading}
                onClickViewMore={() => {
                    setSearchParams({ view: "new" });
                }}
            />
        </Box>
    );
};

export default NewBot;
