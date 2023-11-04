import { Box, BoxProps } from "@mui/material";
import useGetTopRateBot from "src/hooks/useGetTopRateBot";
import useTranslation from "src/hooks/utils/useTranslation";
import { BotListBaseV2 } from "src/pages/Market/BotListBaseV2";

export interface BotListTopRateBotProps extends BoxProps {}

export const BotListTopRateBot = ({ sx, ...rest }: BotListTopRateBotProps) => {
    const t = useTranslation();

    return (
        <Box sx={sx} {...rest} mx={4}>
            <BotListBaseV2
                title={t("page.kamiStore.topRateBot")}
                getBots={(page) =>
                    useGetTopRateBot({
                        isGetAll: false,
                        numPage: page,
                        numRows: 6,
                    })
                }
            />
        </Box>
    );
};

export default BotListTopRateBot;
