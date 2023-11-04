import { Box, BoxProps } from "@mui/material";
import { FilterBot } from "src/common/types";
import useGetMarketAll from "src/hooks/useGetMarketAll";
import useTranslation from "src/hooks/utils/useTranslation";
import BotListBaseV2 from "src/pages/Market/BotListBaseV2";

export interface BotListResultProps extends BoxProps {
    filter: FilterBot;
}

export const BotListResult = ({ filter, sx, ...rest }: BotListResultProps) => {
    const t = useTranslation();

    return (
        <Box sx={sx} {...rest} mx={4}>
            <BotListBaseV2
                title={t("page.kamiStore.result")}
                getBots={(page) =>
                    useGetMarketAll({
                        isGetAll: false,
                        numPage: page,
                        numRows: 6,
                        search: filter.search,
                        tags: filter.tags,
                    })
                }
            />
        </Box>
    );
};

export default BotListResult;
