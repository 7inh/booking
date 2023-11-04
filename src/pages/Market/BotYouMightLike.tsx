import { Box, BoxProps } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import CarouselsBotList from "src/components/Carousels/CarouselsBotList/CarouselsBotList";
import useGetPersonalize from "src/hooks/useGetPersonalizeBot";
import useTranslation from "src/hooks/utils/useTranslation";

export interface BotYouMightLikeProps extends BoxProps {}

const BotYouMightLike = (props: BotYouMightLikeProps) => {
    const t = useTranslation();
    const setSearchParams = useSearchParams()[1];

    const { data: bots, isLoading, isFetched } = useGetPersonalize({});

    return (
        <Box {...props}>
            <CarouselsBotList
                title={t("page.kamiStore.youMightLike")}
                size={{
                    row: 1,
                    column: 3,
                    slice: isFetched ? Math.ceil(bots.length / 3) : 3,
                }}
                bots={bots}
                isLoading={isLoading}
                onClickViewMore={() => {
                    setSearchParams({ view: "personalize" });
                }}
            />
        </Box>
    );
};

export default BotYouMightLike;
