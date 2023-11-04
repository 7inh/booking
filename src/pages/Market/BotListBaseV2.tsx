import { Box, BoxProps, IconButton, Skeleton, Typography } from "@mui/material";
import BotItem from "src/components/Bot/BotItem";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import LinkBase from "src/components/Links/LinkBase";
import { v4 as uuidv4 } from "uuid";

export interface BotListBaseV2Props extends BoxProps {
    title: string;
    getBots: (page: number) => {
        data: any[];
        isFetched: boolean;
        isFetching: boolean;
    };
    onGoBack?: () => void;
}

export const BotListPerPageBaseV2 = ({
    getBots,
    onFetched,
    state,
    page,
}: {
    getBots: BotListBaseV2Props["getBots"];
    onFetched: (isLastPage: boolean) => void;
    onReachedLastPage?: () => void;
    state: "fetching" | "fetched";
    page: number;
}) => {
    const { data: bots = [], isFetched: isFetchedBots } = getBots(page);

    useEffect(() => {
        if (state === "fetching" && isFetchedBots) {
            onFetched(!bots.length);
        }
    }, [bots.length, isFetchedBots, onFetched, state]);

    return (
        <>
            {state === "fetching"
                ? Array.from({ length: bots.length || 6 }).map((_, index) => (
                      <Skeleton
                          key={index}
                          variant="rectangular"
                          width="344px"
                          height="96px"
                          sx={{ borderRadius: 2 }}
                      />
                  ))
                : bots.map((bot: any) => (
                      <LinkBase key={bot.botToken} to={`/kami-store/${bot.botToken}`}>
                          <BotItem
                              botId={bot.botToken}
                              botName={bot.botName}
                              version={bot.version}
                              avatar={bot.avatar || ""}
                              isPublished={bot.isPublic}
                              withPriceV2
                              price={bot.price}
                              overview={{
                                  purchased: bot.sales,
                                  star: bot.avgStar,
                                  numReview: bot.numReview,
                              }}
                              level={bot.level}
                              chatColor={bot.chatColor}
                          />
                      </LinkBase>
                  ))}
        </>
    );
};

export const BotListBaseV2 = ({ title, getBots, onGoBack, sx, ...rest }: BotListBaseV2Props) => {
    const setSearchParams = useSearchParams()[1];

    const [pageWithKey, setPageWithKey] = useState<
        {
            page: number;
            key: string;
            state: "fetching" | "fetched";
            isLastPage?: boolean;
        }[]
    >([{ page: 1, key: uuidv4(), state: "fetching" }]);

    const handleScrollToBottom = useCallback(() => {
        const lastPageWithKey = pageWithKey[pageWithKey.length - 1];
        if (lastPageWithKey.state === "fetching" || lastPageWithKey.isLastPage) return;

        setPageWithKey((prev) => {
            const lastPage = prev[prev.length - 1].page;
            return [
                ...prev,
                {
                    page: lastPage + 1,
                    key: uuidv4(),
                    state: "fetching",
                },
            ];
        });
    }, [pageWithKey]);

    const handleFetched = useCallback((key: string, isLastPage: boolean) => {
        setPageWithKey((prev) => {
            return prev.map((pageWithKey) => {
                if (pageWithKey.key === key) {
                    return {
                        ...pageWithKey,
                        state: "fetched",
                        isLastPage,
                    };
                }
                return pageWithKey;
            });
        });
    }, []);

    useEffect(() => {
        const main = document.body.querySelector("main");
        if (!main) return;

        const handleScroll = () => {
            if (main.scrollTop + main.clientHeight >= main.scrollHeight - 1) {
                handleScrollToBottom();
            }
        };

        main?.addEventListener("scroll", handleScroll);

        return () => {
            main.removeEventListener("scroll", handleScroll);
        };
    }, [handleScrollToBottom]);

    return (
        <Box sx={sx} {...rest}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                }}
            >
                <Box>
                    <IconButton
                        onClick={() => {
                            onGoBack?.();

                            setSearchParams({});
                        }}
                    >
                        <KeyboardBackspaceRoundedIcon />
                    </IconButton>
                </Box>
                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: 400,
                        mb: 2,
                    }}
                >
                    {title}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, 344px)",
                    justifyContent: "left",
                    gridGap: 12,
                }}
            >
                {pageWithKey.map(({ page, key, state }) => {
                    return (
                        <BotListPerPageBaseV2
                            key={key}
                            getBots={getBots}
                            onFetched={(isLastPage) => handleFetched(key, isLastPage)}
                            state={state}
                            page={page}
                        />
                    );
                })}
            </Box>
        </Box>
    );
};

export default BotListBaseV2;
