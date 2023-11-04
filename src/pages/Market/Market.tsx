import { Box, Stack } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterBot } from "src/common/types";
import BrandExchange from "src/components/Brands/BrandExchange";
import BrandGiftCode from "src/components/Brands/BrandGiftCode";
import BrandOfferV2 from "src/components/Brands/BrandOfferV2";
import BrandWelcome from "src/components/Brands/BrandWelcome";
import ContainerRow from "src/components/Containers/ContainerRow";
import CustomBreadcrumbs from "src/components/CustomBreadcrumbs/CustomBreadcrumbs";
import SearchAndFilterV2 from "src/components/Filters/SearchAndFilterV2";
import useTranslation from "src/hooks/utils/useTranslation";
import BotListNew from "src/pages/Market/BotListNew";
import BotListPersonalize from "src/pages/Market/BotListPersonalize";
import BotListResult from "src/pages/Market/BotListResult";
import BotListTopRateBot from "src/pages/Market/BotListTopRate";
import BotListTrending from "src/pages/Market/BotListTrending";
import NewBot from "src/pages/Market/NewBot";
import TopRateBot from "src/pages/Market/TopRateBot";
import TrendingBot from "src/pages/Market/TrendingBot";

const Market = () => {
    const t = useTranslation();

    const [searchParams, setSearchParams] = useSearchParams();
    const currentView = searchParams.get("view");
    const filter = useMemo(() => {
        const orgs = searchParams.getAll("orgs");
        const groups = searchParams.getAll("groups");
        const tags = searchParams.getAll("tags");
        const search = searchParams.get("search");

        return {
            orgs: orgs.map((org) => ({ organizeId: org })),
            groups: groups.map((group) => ({ groupId: group })),
            tags: tags,
            search: search || "",
        };
    }, [searchParams]);

    const isFiltering = useMemo(() => {
        return (
            filter.orgs.length > 0 ||
            filter.groups.length > 0 ||
            filter.tags.length > 0 ||
            filter.search !== ""
        );
    }, [filter]);

    const handleApplyFilter = useCallback(
        (filter: FilterBot) => {
            setSearchParams({
                orgs: filter.orgs.map((org) => org.organizeId),
                groups: filter.groups.map((group) => group.groupId),
                tags: filter.tags,
                ...(filter.search && { search: filter.search }),
            });
        },
        [setSearchParams]
    );

    const renderMarketItem = useMemo(() => {
        if (isFiltering) {
            return <BotListResult filter={filter} />;
        }

        if (currentView === "personalize") {
            return <BotListPersonalize />;
        }

        if (currentView === "top-rate") {
            return <BotListTopRateBot />;
        }

        if (currentView === "trending") {
            return <BotListTrending />;
        }

        if (currentView === "new") {
            return <BotListNew />;
        }

        return (
            <Stack spacing={5}>
                <TopRateBot />
                <TrendingBot />
                <NewBot />
            </Stack>
        );
    }, [currentView, filter, isFiltering]);

    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" maxWidth="1120px" minWidth="800px" mx="auto">
                <CustomBreadcrumbs
                    heading={t("page.kamiStore.title")}
                    links={[{ name: t("page.kamiStore.title"), href: "/kami-store" }]}
                    sx={{
                        mb: { xs: 3, md: 5 },
                        px: 4,
                    }}
                />
                <Box mx={4}>
                    <BrandWelcome />
                    <br />
                    <Box
                        sx={{
                            display: "grid",
                            gap: "4px",
                            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                            gridAutoRows: "1fr",
                            gridTemplateRows: "repeat(auto-fill, minmax(150px, 1fr))",
                        }}
                    >
                        <BrandExchange />
                        <BrandOfferV2 />
                        <BrandGiftCode />
                    </Box>
                </Box>
                <ContainerRow
                    sx={{
                        justifyContent: "center",
                        width: "100%",
                        my: 3,
                    }}
                >
                    <SearchAndFilterV2
                        key={JSON.stringify(filter)}
                        filter={filter}
                        setSearchText={() => {}}
                        onApplyFilter={handleApplyFilter}
                    />
                </ContainerRow>
                {renderMarketItem}
                <Box mb={10}></Box>
            </Box>
        </Box>
    );
};

export default Market;
