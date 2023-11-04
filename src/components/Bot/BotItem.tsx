import { Box, BoxProps, Tooltip, Typography } from "@mui/material";
import BotAvatar from "src/components/Bot/BotAvatar";
import BotPrice from "src/components/Bot/BotPrice";
import BotPriceV2 from "src/components/Bot/BotPriceV2";
import ContainerRow from "src/components/Containers/ContainerRow";

import { IconDownload, IconStar } from "src/components/Icons/IconExternal";
import LinkBase from "src/components/Links/LinkBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface BotItemProps extends BoxProps {
    botId: string;
    botName: string;
    version: string;
    avatar: string;
    isPublished: boolean;
    withPrice?: boolean;
    withPriceV2?: boolean;
    price?: number;
    overview?: {
        purchased: number;
        star: number;
        numReview: number;
    };
    isAllowViewProfile?: boolean;
    level: number;
    isCheckLevel?: boolean;
    chatColor?: string;
}

const BotItem = ({
    botId,
    avatar,
    botName,
    version,
    isPublished,
    withPrice,
    withPriceV2,
    price,
    overview,
    isAllowViewProfile,
    level,
    isCheckLevel = false,
    chatColor,
    ...props
}: BotItemProps) => {
    const t = useTranslation();

    return (
        <Box
            {...props}
            sx={{
                width: {
                    xl: "344px",
                    xs: "100%",
                },
                height: "96px",
                borderRadius: "16px",
                boxShadow: {
                    sm: "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                    cursor: "pointer",
                },
            }}
        >
            <Box width="100%" mx={{ sm: 3 }} display="flex" gap="16px">
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Box position="relative">
                        <BotAvatar
                            botName={botName}
                            chatColor={chatColor}
                            src={avatar || ""}
                            size="40px"
                            isPublic={isPublished && (!isCheckLevel || level === 1)}
                        />
                    </Box>
                </Box>
                <Box my="2px" flexGrow={1}>
                    <ContainerRow gap={0.5}>
                        <LinkBase to={`/management/${botId}`} disabled={!isAllowViewProfile}>
                            <Tooltip title={botName} placement="top-start">
                                <Typography
                                    sx={{
                                        color: "rgba(33, 43, 54, 1)",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                        lineHeight: "22px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "-webkit-box",
                                        WebkitLineClamp: "2",
                                        WebkitBoxOrient: "vertical",
                                        wordBreak: "break-word",
                                        "&:hover": {
                                            textDecoration: "underline",
                                        },
                                        width: "fit-content",
                                    }}
                                    onClick={(e) => isAllowViewProfile && e.stopPropagation()}
                                >
                                    {botName}
                                </Typography>
                            </Tooltip>
                        </LinkBase>
                    </ContainerRow>
                    {overview ? (
                        <Box
                            sx={{
                                p: "2px 6px",
                                width: "fit-content",
                                display: "flex",
                                gap: "5px",
                            }}
                        >
                            <Box display="flex" gap={0.3}>
                                <IconStar
                                    sx={{
                                        color: "rgba(255, 180, 0, 1)",
                                    }}
                                />
                                <Typography
                                    sx={{
                                        fontWeight: 300,
                                        fontSize: "14px",
                                        lineHeight: "20px",
                                        color: "#3F4343",
                                    }}
                                >
                                    {overview.star}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: 300,
                                        fontSize: "10px",
                                        color: "#909090",
                                    }}
                                >
                                    ({overview.numReview})
                                </Typography>
                            </Box>
                            <Box display="flex" gap={0.3}>
                                <IconDownload
                                    sx={{
                                        color: "primary.main",
                                    }}
                                />
                                <Typography
                                    sx={{
                                        fontWeight: 300,
                                        fontSize: "14px",
                                        lineHeight: "20px",
                                        color: "#3F4343",
                                    }}
                                >
                                    {overview.purchased}
                                </Typography>
                            </Box>
                        </Box>
                    ) : null}
                    <Box>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: "12px",
                                lineHeight: "22px",
                                color: {
                                    sm: "#919EAB",
                                    xs: "#FF4B22",
                                },
                                display: {
                                    sm: "block",
                                    xs: "inline-block",
                                },
                                background: {
                                    xs: "rgba(201, 208, 215, 0.16)",
                                    sm: "none",
                                },
                                borderRadius: {
                                    xs: "4px",
                                    sm: "none",
                                },
                                p: {
                                    xs: "2px 6px",
                                    sm: "none",
                                },
                            }}
                        >
                            {t("common.version")} {version}
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" flexShrink={0}>
                    {withPrice ? <BotPrice price={price} /> : null}
                    {withPriceV2 ? (
                        <Box mr={{ sm: "-24px" }}>
                            <BotPriceV2 price={price} />
                        </Box>
                    ) : null}
                </Box>
            </Box>
        </Box>
    );
};

export default BotItem;
