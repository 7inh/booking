import { Box, BoxProps } from "@mui/material";
import useGetPersonalize from "src/hooks/useGetPersonalizeBot";
import useTranslation from "src/hooks/utils/useTranslation";
import { BotListBaseV2 } from "src/pages/Market/BotListBaseV2";

export interface BotListPersonalizeProps extends BoxProps {}

export const BotListPersonalize = ({ sx, ...rest }: BotListPersonalizeProps) => {
    const t = useTranslation();

    return (
        <Box sx={sx} {...rest} mx={4}>
            <BotListBaseV2
                title={t("page.kamiStore.youMightLike")}
                getBots={(page) =>
                    useGetPersonalize({
                        isGetAll: false,
                        numPage: page,
                        numRows: 6,
                    })
                }
            />
        </Box>
    );
};

export default BotListPersonalize;
