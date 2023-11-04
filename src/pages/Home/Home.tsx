import { Box, Button, Grid, Typography } from "@mui/material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BotItem from "src/components/Bot/BotItem";
import CardNotFoundBot from "src/components/Cards/CardNotFoundBot";
import CustomBreadcrumbs from "src/components/CustomBreadcrumbs/CustomBreadcrumbs";
import FormCreateBot from "src/components/Forms/FormCreateBot";
import LinkBase from "src/components/Links/LinkBase";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import useGetUserBots from "src/hooks/useGetUserBots";
import { useResponsive } from "src/hooks/utils/useResponsive";
import useTranslation from "src/hooks/utils/useTranslation";
import { v4 as uuidv4 } from "uuid";

const latestNews = [
    {
        href: "https://book.kamimind.ai/",
        title: "branding.home.introducingKamiMind",
        image: "/introducing-kamimind.png",
    },
    {
        href: "https://book.kamimind.ai/huong-dan-tao-bot/huong-dan-tao-bot-tren-web",
        title: "branding.home.instructionsToCreateBot",
        image: "/instructions-to-create-bot.png",
    },
    {
        href: "https://book.kamimind.ai/thuoc-tinh-cua-bot",
        title: "branding.home.botProperties",
        image: "/bot-properties.png",
    },
    {
        href: "https://book.kamimind.ai/huan-luyen-bot",
        title: "branding.home.trainBot",
        image: "/train-bot.png",
    },
];

const Home = () => {
    // TODO: get bot sort by updated time
    const {
        data: userBots,
        refetch,
        isFetching,
        isFetched,
    } = useGetUserBots({
        isGetAll: false,
        orderKey: "latestChatTime",
        orderValue: "DESC",
    });

    const navigate = useNavigate();
    const t = useTranslation();
    const smDown = useResponsive("down", "sm");

    const renderHomeCard = useMemo(() => {
        if (smDown) {
            return null;
        }
        return (
            <>
                <Grid container spacing={3}>
                    <Grid item sm={8}>
                        <Box
                            sx={{
                                height: "264px",
                                position: "relative",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box
                                ml={4}
                                my={2}
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                gap={2}
                            >
                                <Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: "24px",
                                                width: "150px",
                                                color: "#004B50",
                                            }}
                                        >
                                            {t("branding.home.welcomeToKamiMind")}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: "24px",
                                            }}
                                        >
                                            👋
                                        </Typography>
                                    </Box>
                                    <Typography
                                        my={1}
                                        sx={{
                                            color: "#004B50",
                                        }}
                                    >
                                        {t("branding.home.welcomeToKamiMindMarketIntro")}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            color: "white",
                                            boxShadow: "none",
                                            borderRadius: "8px",
                                            textTransform: "none",
                                            "&:hover": {
                                                boxShadow: "none",
                                            },
                                        }}
                                        onClick={() => navigate("/create-bot")}
                                    >
                                        {t("branding.home.exploreNow")}
                                    </Button>
                                </Box>
                            </Box>
                            <Box width="100%" my={2}>
                                <Box
                                    sx={{
                                        backgroundImage: "url(/branding_1.svg)",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        backgroundSize: "contain",
                                        height: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        mx: 4,
                                    }}
                                ></Box>
                            </Box>
                            <Box
                                sx={{
                                    top: "0",
                                    position: "absolute",
                                    background:
                                        "linear-gradient(135deg, #FF4B22 0%, #5A8DFF 100%);",
                                    width: "100%",
                                    height: "264px",
                                    opacity: "0.2",
                                    borderRadius: "16px",
                                    pointerEvents: "none",
                                }}
                            ></Box>
                        </Box>
                    </Grid>
                    <Grid item sm={4}>
                        <Box
                            sx={{
                                backgroundImage: "url(/home_1.png)",
                                height: "264px",
                                borderRadius: "16px",
                                display: "flex",
                                alignItems: "end",
                                justifyContent: "start",
                                position: "relative",
                            }}
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                gap={0.5}
                                mx={2}
                                my={2}
                                zIndex={1}
                            >
                                <Typography
                                    sx={{
                                        textTransform: "uppercase",
                                        color: "rgba(91, 154, 228, 1)",
                                        fontWeight: 700,
                                        fontSize: "12px",
                                    }}
                                >
                                    {t("branding.home.featureApp")}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "white",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                    }}
                                >
                                    {t("branding.home.featureAppIntro")}
                                </Typography>
                                <Box>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            color: "white",
                                            boxShadow: "none",
                                            borderRadius: "8px",
                                            textTransform: "none",
                                            "&:hover": {
                                                boxShadow: "none",
                                            },
                                        }}
                                        onClick={() => navigate("/kami-store")}
                                    >
                                        {t("branding.home.featureAppNavigation")}
                                    </Button>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    top: "0",
                                    position: "absolute",
                                    background:
                                        "linear-gradient(180deg, rgba(0, 0, 0, 0) -1.23%, #000000 80%);",
                                    width: "100%",
                                    height: "264px",
                                    borderRadius: "16px",
                                }}
                            ></Box>
                        </Box>
                    </Grid>
                </Grid>
            </>
        );
    }, [navigate, smDown, t]);

    return (
        <Box display="flex" alignItems="center">
            <Box
                width="100%"
                px={{ md: 4, xs: 2.5 }}
                boxSizing="border-box"
                overflow="auto"
                maxWidth="1116px"
                mx="auto"
            >
                <LoadingIcon open={isFetching} />
                <CustomBreadcrumbs heading={t("page.home.title")} links={[{}]} />

                {renderHomeCard}

                {userBots.length > 0 ? (
                    <Box my={{ sm: 5, xs: 0 }}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            my={2}
                        >
                            <Typography variant="h6">{t("page.home.myBots")}</Typography>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    color: "primary.main",
                                    lineHeight: "20px",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                }}
                                onClick={() => navigate("/management")}
                            >
                                {t("common.viewAll")}
                            </Typography>
                        </Box>

                        <Grid container spacing={{ sm: 2.5, xs: 1 }}>
                            {userBots.slice(0, 9).map((bot) => (
                                <Grid key={uuidv4()} item xs={12} sm={6} md={4}>
                                    <BotItem
                                        key={bot.id}
                                        botId={bot.id}
                                        botName={bot.botName}
                                        version={bot.version || ""}
                                        avatar={bot.avatar || ""}
                                        isPublished={bot.isPublic || false}
                                        onClick={() => navigate(`/chat?botToken=${bot.id}`)}
                                        withPriceV2
                                        price={bot.price}
                                        level={bot.level}
                                        chatColor={bot.chatColor}
                                        isCheckLevel
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ) : isFetched && !smDown ? (
                    <>
                        <br />
                        <br />
                        <br />
                        <CardNotFoundBot />
                        <br />
                        <br />
                        <br />
                    </>
                ) : null}

                <Box my={{ sm: 5, xs: 0 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
                        <Typography variant="h4">{t("common.createYourBot")}</Typography>
                    </Box>

                    <FormCreateBot id="create-bot-form" onCreateSuccess={refetch} showActions />
                </Box>

                <Box my={5}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
                        <Typography variant="h4">{t("common.latestNews")}</Typography>
                    </Box>
                    <Grid container spacing={2.5}>
                        {latestNews.map((news) => (
                            <Grid item sm={6} md={3} xs={12} key={uuidv4()}>
                                <Box
                                    sx={{
                                        backgroundImage: `url(${news.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "top",
                                        backgroundRepeat: "no-repeat",
                                        minHeight: "250px",
                                        // width: "250px",
                                        borderRadius: "16px",
                                        display: "flex",
                                        position: "relative",
                                    }}
                                >
                                    <Box
                                        zIndex={1}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            width: "100%",
                                        }}
                                    >
                                        <LinkBase to={news.href} target="_blank">
                                            <Typography
                                                sx={{
                                                    fontWeight: 700,
                                                    textDecoration: "underline",
                                                    textAlign: "right",
                                                    p: 2.5,
                                                    color: "#FFF",
                                                }}
                                            >
                                                {t("common.readMore")}
                                            </Typography>
                                        </LinkBase>
                                        <Box
                                            padding={2.5}
                                            sx={{
                                                minHeight: "80px",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                color: "#FFF",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: "24px",
                                                    fontWeight: 600,
                                                    lineHeight: "34px",
                                                }}
                                            >
                                                {t(news.title)}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: "10px",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        borderRadius: "8px",
                                                        border: "1px solid #fff",
                                                        padding: "3px 8px",
                                                    }}
                                                >
                                                    {t("common.news")}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        borderRadius: "8px",
                                                        border: "1px solid #fff",
                                                        padding: "3px 8px",
                                                    }}
                                                >
                                                    {t("common.tips")}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            top: "0",
                                            position: "absolute",
                                            background:
                                                "linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.00) 100%)",
                                            width: "100%",
                                            height: "250px",
                                            borderRadius: "16px",
                                        }}
                                    ></Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
