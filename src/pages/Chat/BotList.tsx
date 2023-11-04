import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Skeleton,
    Tooltip,
    Typography,
} from "@mui/material";
import { memo } from "react";
import { Bot } from "src/common/types";
import { getBotLevelName } from "src/common/utils";
import BotAvatar from "src/components/Bot/BotAvatar";
import BotPriceV2 from "src/components/Bot/BotPriceV2";
import useTranslation from "src/hooks/utils/useTranslation";
import { v4 as uuidv4 } from "uuid";

export interface BotListProps {
    botToken: string;
    isFetched: boolean;
    filteredBots: Bot[];
    marginLeft?: number;
    onSelectBot: (botToken: string) => void;
}

const BotList = ({ botToken, isFetched, filteredBots, marginLeft, onSelectBot }: BotListProps) => {
    const t = useTranslation();

    return (
        <List sx={{ flexGrow: 1, px: 1, py: 0 }} id="bot-list">
            {filteredBots.length === 0 && isFetched ? (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                    <Typography color="textSecondary">{t("message.noBotFound")}</Typography>
                </Box>
            ) : null}
            {!isFetched ? (
                <>
                    {Array.from({ length: Math.max(filteredBots.length, 5) }).map(() => (
                        <ListItem
                            key={uuidv4()}
                            disablePadding
                            sx={{
                                mb: 0.2,
                            }}
                        >
                            <Skeleton variant="rounded" width={344} height={56} />
                        </ListItem>
                    ))}
                </>
            ) : (
                <>
                    {filteredBots.map((bot) => (
                        <Tooltip
                            key={bot.id}
                            title={bot.botName}
                            placement="right"
                            PopperProps={{
                                ...(marginLeft
                                    ? {
                                          modifiers: [
                                              {
                                                  name: "offset",
                                                  options: {
                                                      offset: [0, marginLeft],
                                                  },
                                              },
                                          ],
                                      }
                                    : {}),
                            }}
                        >
                            <ListItem
                                disablePadding
                                sx={{
                                    display: "block",
                                    mb: 0.25,
                                    "& .Mui-selected": {},
                                    "&:hover .Mui-selected": {
                                        bgcolor: "rgba(166, 166, 166, 0.31)",
                                    },
                                    overflow: "hidden",
                                }}
                            >
                                <ListItemButton
                                    sx={{
                                        borderRadius: 2,
                                        p: 0,
                                    }}
                                    selected={bot.id === botToken}
                                    onClick={() => {
                                        if (bot.id === botToken) return;

                                        onSelectBot(bot.id);
                                    }}
                                >
                                    <Box
                                        sx={{
                                            p: 1,
                                            position: "relative",
                                        }}
                                    >
                                        <BotAvatar
                                            botName={bot.botName}
                                            chatColor={bot.chatColor}
                                            src={bot.avatar || ""}
                                            isPublic={bot.isPublic && bot.level === 1}
                                        />
                                    </Box>
                                    <ListItemText
                                        primary={
                                            <Typography
                                                fontWeight="300"
                                                textOverflow="ellipsis"
                                                noWrap
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: 600,
                                                    lineHeight: "22px",
                                                }}
                                            >
                                                {bot.botName}
                                            </Typography>
                                        }
                                        secondary={
                                            bot.organizeId
                                                ? t("common.organization")
                                                : t(`common.${getBotLevelName(bot.level || 1)}`)
                                        }
                                        secondaryTypographyProps={{
                                            textOverflow: "ellipsis",
                                            noWrap: true,
                                            bgcolor:
                                                bot.id === botToken
                                                    ? "rgba(201, 208, 215, 0.3)"
                                                    : "rgba(201, 208, 215, 0.16)",
                                            fontSize: "12px !important",
                                            color: "primary.main",
                                            fontWeight: "600 !important",
                                            borderRadius: "4px",
                                            px: 0.5,
                                            py: 0.25,
                                            maxWidth: "fit-content",
                                        }}
                                        sx={{ ml: 0.5 }}
                                    />
                                    <Box>
                                        <BotPriceV2 price={bot.price} isSmall />
                                    </Box>
                                </ListItemButton>
                            </ListItem>
                        </Tooltip>
                    ))}
                </>
            )}
        </List>
    );
};

export default memo(BotList);
