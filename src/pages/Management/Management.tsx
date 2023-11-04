import { Box } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { FilterBot } from "src/common/types";
import CustomBreadcrumbs from "src/components/CustomBreadcrumbs/CustomBreadcrumbs";
import SearchAndFilterV2 from "src/components/Filters/SearchAndFilterV2";
import useTranslation from "src/hooks/utils/useTranslation";
import ManagementBotList from "src/pages/Management/ManagementBotList";
import ManagementEmpty from "src/pages/Management/ManagementEmpty";

const Management = () => {
    const t = useTranslation();

    const [isEmpty, setIsEmpty] = useState(false);
    const [filter, setFilter] = useState<FilterBot>({
        search: "",
        tags: [],
        orgs: [],
        groups: [],
    });

    const handleApplyFilter = useCallback((filter: FilterBot) => {
        setFilter({
            ...filter,
            orgs: filter.orgs.map((org) => org.organizeId),
            groups: filter.groups.map((group) => group.groupId),
        });
    }, []);

    const isFilter = useMemo(() => {
        return filter.search || filter.tags.length || filter.orgs.length || filter.groups.length;
    }, [filter]);

    return (
        <Box display="flex" alignItems="center">
            <Box px={4} width="100%" minWidth="900px" maxWidth="1052px" mx="auto">
                <CustomBreadcrumbs
                    heading={t("page.management.title")}
                    links={[
                        {
                            href: "/management",
                            name: t("page.management.title"),
                        },
                    ]}
                />

                <Box>
                    <Box mt={4}>
                        <SearchAndFilterV2
                            filter={filter}
                            setSearchText={() => {}}
                            onApplyFilter={handleApplyFilter}
                        />
                    </Box>

                    <ManagementBotList
                        filter={filter}
                        onDataChange={(haveData) => setIsEmpty(!haveData)}
                    />
                </Box>
                {isEmpty && !isFilter ? <ManagementEmpty /> : null}
            </Box>
        </Box>
    );
};

export default Management;
