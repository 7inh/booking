import { Box, BoxProps } from "@mui/material";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import CarouselPreview from "src/components/Carousels/CarouselPreview/CarouselPreview";
import CustomBreadcrumbs from "src/components/CustomBreadcrumbs/CustomBreadcrumbs";
import LoadingIcon from "src/components/LoadingIcon/LoadingIcon";
import useGetMarketBotProfile from "src/hooks/useGetMarketBotProfile";
import useTranslation from "src/hooks/utils/useTranslation";
import BotProfile from "src/pages/Market/MarketDetail/BotProfile";
import BotYouMightLike from "src/pages/Market/MarketDetail/BotYouMightLike";
import InformationAndAuthor from "src/pages/Market/MarketDetail/InformationAndAuthor";
import OverView from "src/pages/Market/MarketDetail/Overview";
import Review from "src/pages/Market/MarketDetail/Review";
import StartYourReview from "src/pages/Market/MarketDetail/StartYourReview";
import { v4 as uuidv4 } from "uuid";

export interface MarketDetailProps extends BoxProps {}

const MarketDetail = () => {
    const { id: botToken = "" } = useParams();
    const [reviewSectionKey, setReviewSectionKey] = useState(uuidv4());

    const t = useTranslation();

    const {
        data: botProfile,
        refetch: refetchBotProfile,
        isFetching,
    } = useGetMarketBotProfile({
        botToken,
        onSuccess: () => setReviewSectionKey(uuidv4()),
    });

    const renderBotProfile = useMemo(() => {
        if (!botProfile?.botName) return null;

        return (
            <BotProfile
                botProfile={botProfile}
                sx={{
                    mx: 4,
                }}
                onAddBotFromMarket={() => {
                    refetchBotProfile();
                }}
            />
        );
    }, [botProfile, refetchBotProfile]);

    const renderOverview = useMemo(() => {
        if (!botProfile?.botName) return null;

        return (
            <OverView
                botProfile={botProfile}
                sx={{
                    mx: 4,
                }}
            />
        );
    }, [botProfile]);

    const renderPreview = useMemo(() => {
        if (!botProfile?.botName) return null;

        if (!botProfile?.previewImg?.length) return null;

        return (
            <CarouselPreview
                sx={{
                    mx: 4,
                }}
                previewImg={botProfile?.previewImg || []}
            />
        );
    }, [botProfile]);

    const renderReview = useMemo(() => {
        if (!botProfile?.botName) return null;

        return (
            <Review
                key={reviewSectionKey}
                sx={{
                    mx: 4,
                }}
                botToken={botToken}
                numReview={botProfile?.numReview}
                onChange={() => {
                    refetchBotProfile();
                }}
            />
        );
    }, [botProfile?.botName, botProfile?.numReview, botToken, refetchBotProfile, reviewSectionKey]);

    const renderStartYourReview = useMemo(() => {
        return (
            <StartYourReview
                botToken={botToken}
                sx={{
                    mx: 4,
                }}
                onReviewSubmittedSuccess={() => {
                    refetchBotProfile();
                }}
            />
        );
    }, [botToken, refetchBotProfile]);

    const renderRecommendation = useMemo(() => {
        return <BotYouMightLike isShowViewMore />;
    }, []);

    const renderInformationAndAuthor = useMemo(() => {
        return (
            <InformationAndAuthor
                version={botProfile?.version || ""}
                tags={botProfile?.tags || []}
                language={botProfile?.language || ""}
                voiceId={botProfile?.voiceId || ""}
                createTime={botProfile?.createTime || ""}
                description={botProfile?.description || ""}
                publishManual={botProfile?.publishManual || ""}
                publishNote={botProfile?.publishNote || ""}
                userAvt={botProfile?.userAvt || ""}
                authName={botProfile?.authName || ""}
                userBio={botProfile?.userBio || ""}
                sx={{
                    mx: 4,
                }}
            />
        );
    }, [botProfile]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <LoadingIcon open={isFetching} />
            <Box width="100%" maxWidth="1136px">
                <CustomBreadcrumbs
                    heading={t("page.kamiStore.marketDetail")}
                    links={[
                        { name: t("page.kamiStore.title"), href: "/kami-store" },
                        {
                            href: `/management/${botToken}`,
                            name: botProfile?.botName || "",
                        },
                    ]}
                    sx={{
                        mb: { xs: 3, md: 5 },
                        px: 4,
                    }}
                />
                {botProfile?.botName ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: "40px",
                        }}
                    >
                        {renderBotProfile}
                        {renderOverview}
                        {renderPreview}
                        {renderReview}
                        {renderStartYourReview}
                        {renderRecommendation}
                        {renderInformationAndAuthor}
                    </Box>
                ) : null}
                <Box mb={10}></Box>
            </Box>
        </Box>
    );
};

export default MarketDetail;
