import { Box, BoxProps } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CarouselsBotList from "src/components/Carousels/CarouselsBotList/CarouselsBotList";
import useGetPersonalize from "src/hooks/useGetPersonalizeBot";
import useTranslation from "src/hooks/utils/useTranslation";

export interface BotYouMightLikeProps extends BoxProps {
    isShowViewMore?: boolean;
}

const BotYouMightLike = ({ isShowViewMore, ...props }: BotYouMightLikeProps) => {
    const navigate = useNavigate();
    const t = useTranslation();

    const {
        data: bots,
        isLoading,
        isFetched,
    } = useGetPersonalize({
        numPage: 1,
        numRows: 6 * 3,
    });

    return (
        <Box {...props}>
            <CarouselsBotList
                isShowViewMore={isShowViewMore}
                title={t("page.kamiStore.youMightLike")}
                size={{
                    row: 2,
                    column: 3,
                    slice: isFetched ? Math.ceil(bots.length / 6) : 1,
                }}
                bots={bots}
                isLoading={isLoading}
                onClickViewMore={() => {
                    navigate("/kami-store?view=personalize");
                }}
            />
        </Box>
    );
};

export default BotYouMightLike;
