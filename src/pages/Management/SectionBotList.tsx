import { Box, Skeleton, Typography } from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Bot } from "src/common/types";
import BotItem from "src/components/Bot/BotItem";
import Paging from "src/components/Paging/Paging";
import { v4 as uuidv4 } from "uuid";

export interface SectionBotListProps {
    bots: Bot[];
    title: string;
    isFetching: boolean;
    isFetched: boolean;
    totalItems: number;
    itemsPerPage?: number;
    totalCount: number;
    page?: number;
    onChangePage?: (page: number) => void;
    hiddenIfEmpty?: boolean;
    isCheckLevel?: boolean;
}

const SectionBotList = ({
    bots,
    title,
    isFetching,
    isFetched,
    totalItems,
    itemsPerPage = 10,
    page = 1,
    onChangePage,
    hiddenIfEmpty,
    isCheckLevel = false,
}: SectionBotListProps) => {
    const navigate = useNavigate();

    if (isFetched && hiddenIfEmpty && bots.length === 0) return null;

    return (
        <Box>
            <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="h6" my={2}>
                    {title}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        color: "darkgray",
                    }}
                >
                    {isFetched && bots.length === 0 ? "(Empty)" : ""}
                </Typography>
            </Box>
            <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fill, 344px);"
                justifyContent="left"
                sx={{
                    gridGap: 10,
                }}
            >
                {!isFetching
                    ? bots.map((bot) => (
                          <BotItem
                              key={bot.id}
                              botId={bot.id}
                              botName={bot.botName}
                              version={bot.version || ""}
                              avatar={bot.avatar || ""}
                              isPublished={Boolean(bot.isPublic)}
                              onClick={() => navigate(`/chat?botToken=${bot.id}`)}
                              isAllowViewProfile
                              withPriceV2
                              price={bot.price}
                              level={bot.level}
                              isCheckLevel={isCheckLevel}
                              chatColor={bot.chatColor}
                          />
                      ))
                    : null}
                {isFetching && bots.length !== 0
                    ? bots.map(() => (
                          <Skeleton key={uuidv4()} variant="rounded" width={344} height={96} />
                      ))
                    : null}
                {isFetching && bots.length === 0
                    ? Array.from({ length: 4 }).map((_, index) => (
                          <Skeleton key={index} variant="rounded" width={344} height={96} />
                      ))
                    : null}
            </Box>
            {isFetched && bots.length ? (
                <Box my={3}>
                    <Paging
                        page={page}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={(value) => onChangePage?.(value)}
                    />
                </Box>
            ) : null}
        </Box>
    );
};

export default memo(SectionBotList);
