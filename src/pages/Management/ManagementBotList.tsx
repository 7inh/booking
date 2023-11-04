import { Box } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { FilterBot } from "src/common/types";
import useGetUserBots from "src/hooks/useGetUserBots";
import useTranslation from "src/hooks/utils/useTranslation";
import SectionBotList from "src/pages/Management/SectionBotList";

export interface ManagementBotListProps {
    filter: FilterBot;
    onDataChange?: (haveData: boolean) => void;
}

const itemsPerPage = 12;

const ManagementBotList = ({ filter, onDataChange }: ManagementBotListProps) => {
    const t = useTranslation();

    const [myBotsPage, setMyBotsPage] = useState(1);
    const [purchasedBotsPage, setPurchasedBotsPage] = useState(1);
    const [orgBotsPage, setOrgBotsPage] = useState(1);

    const {
        data: myBots,
        isFetching: isFetchingMyBots,
        isFetched: isFetchedMyBots,
        totalItems: totalItemsMyBots,
        totalCount: totalCountMyBots,
    } = useGetUserBots({
        options: 0,
        organizeId: filter.orgs,
        groupId: filter.groups,
        tags: filter.tags,
        search: filter.search,
        numPage: myBotsPage,
        itemsPerPage,
    });

    const {
        data: purchasedBots,
        isFetching: isFetchingPurchasedBots,
        isFetched: isFetchedPurchasedBots,
        totalItems: totalItemsPurchasedBots,
        totalCount: totalCountPurchasedBots,
    } = useGetUserBots({
        options: 1,
        organizeId: filter.orgs,
        groupId: filter.groups,
        tags: filter.tags,
        search: filter.search,
        numPage: purchasedBotsPage,
        itemsPerPage,
    });

    const {
        data: orgBots,
        isFetching: isFetchingOrgBot,
        isFetched: isFetchedOrgBot,
        totalItems: totalItemsOrgBot,
        totalCount: totalCountUserBots,
    } = useGetUserBots({
        options: [2, 3],
        organizeId: filter.orgs,
        groupId: filter.groups,
        tags: filter.tags,
        search: filter.search,
        numPage: orgBotsPage,
        itemsPerPage,
    });

    const renderMyBotsList = useMemo(() => {
        return (
            <SectionBotList
                bots={myBots}
                title={t("common.myBots")}
                isFetching={isFetchingMyBots}
                isFetched={isFetchedMyBots}
                totalItems={totalItemsMyBots}
                totalCount={totalCountMyBots}
                page={myBotsPage}
                onChangePage={(page) => setMyBotsPage(page)}
                itemsPerPage={itemsPerPage}
                hiddenIfEmpty
            />
        );
    }, [
        isFetchedMyBots,
        isFetchingMyBots,
        myBots,
        myBotsPage,
        t,
        totalCountMyBots,
        totalItemsMyBots,
    ]);

    const renderPurchasedBotsList = useMemo(() => {
        return (
            <SectionBotList
                bots={purchasedBots}
                title={t("common.purchasedBots")}
                isFetching={isFetchingPurchasedBots}
                isFetched={isFetchedPurchasedBots}
                totalItems={totalItemsPurchasedBots}
                totalCount={totalCountPurchasedBots}
                page={purchasedBotsPage}
                onChangePage={(page) => setPurchasedBotsPage(page)}
                itemsPerPage={itemsPerPage}
                hiddenIfEmpty
            />
        );
    }, [
        isFetchedPurchasedBots,
        isFetchingPurchasedBots,
        purchasedBots,
        purchasedBotsPage,
        t,
        totalCountPurchasedBots,
        totalItemsPurchasedBots,
    ]);

    const renderOrgBotsList = useMemo(() => {
        return (
            <SectionBotList
                bots={orgBots}
                title={t("common.organizationBots")}
                isFetching={isFetchingOrgBot}
                isFetched={isFetchedOrgBot}
                totalItems={totalItemsOrgBot}
                totalCount={totalCountUserBots}
                page={orgBotsPage}
                onChangePage={(page) => setOrgBotsPage(page)}
                itemsPerPage={itemsPerPage}
                hiddenIfEmpty
                isCheckLevel
            />
        );
    }, [
        isFetchedOrgBot,
        isFetchingOrgBot,
        orgBots,
        orgBotsPage,
        t,
        totalCountUserBots,
        totalItemsOrgBot,
    ]);

    useEffect(() => {
        if (
            isFetchedMyBots &&
            isFetchedPurchasedBots &&
            isFetchedOrgBot &&
            myBots?.length === 0 &&
            purchasedBots?.length === 0 &&
            orgBots?.length === 0
        ) {
            onDataChange?.(false);
        } else {
            onDataChange?.(true);
        }
    }, [
        isFetchedMyBots,
        isFetchedOrgBot,
        isFetchedPurchasedBots,
        myBots?.length,
        onDataChange,
        orgBots?.length,
        purchasedBots?.length,
    ]);

    return (
        <Box>
            {renderMyBotsList}
            {renderPurchasedBotsList}
            {renderOrgBotsList}
        </Box>
    );
};

export default ManagementBotList;
