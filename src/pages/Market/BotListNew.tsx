import { Box, BoxProps } from "@mui/material";
import useGetMarketAll from "src/hooks/useGetMarketAll";
import useTranslation from "src/hooks/utils/useTranslation";
import BotListBaseV2 from "src/pages/Market/BotListBaseV2";

export interface BotListNewProps extends BoxProps {}

export const BotListNew = ({ sx, ...rest }: BotListNewProps) => {
    const t = useTranslation();

    return (
        <Box sx={sx} {...rest} mx={4}>
            <BotListBaseV2
                title={t("page.kamiStore.newBot")}
                getBots={(page) =>
                    useGetMarketAll({
                        isGetAll: false,
                        numPage: page,
                        numRows: 6,
                    })
                }
            />
        </Box>
    );
};

export default BotListNew;
