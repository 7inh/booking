import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterBookType, OrderBy } from "src/common/types";
import { mapFilterToParams } from "src/common/utils";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxCenter from "src/components/Boxs/BoxCenter";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import IconLoadingBackdrop from "src/components/Icons/IconLoadingBackdrop";
import ListBook from "src/components/Lists/ListBook";
import ListBookHorizon from "src/components/Lists/ListBookHorizon";
import Paging from "src/components/Paging/Paging";
import SelectOrder from "src/components/Selects/SelectOrder";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useGetItemPerPage from "src/hooks/useGetItemPerPage";
import useGetItemTotal from "src/hooks/useGetItemTotal";
import useTranslation from "src/hooks/utils/useTranslation";

export interface FilterResultProps {
    filter: FilterBookType;
}

const perPage = 12;

const FilterResult = ({ filter }: FilterResultProps) => {
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q") || "";
    const t = useTranslation();

    const [orderBy, setOrderBy] = useState<OrderBy>("newest");
    const [currentView, setCurrentView] = useState<"grid" | "list">("grid");
    const [page, setPage] = useState(1);

    const params = useMemo(() => mapFilterToParams(filter), [filter]);

    const {
        data: books,
        isFetching,
        isFetched,
    } = useGetItemPerPage({
        page,
        perPage,
        filter: params,
        title: q,
        orderBy,
    });
    const { data: totalItems } = useGetItemTotal({ filter: params, title: q });

    const renderBodyWithContent = useMemo(() => {
        return (
            <>
                <BoxHorizon
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        mb: 1,
                    }}
                >
                    <SelectOrder onChange={(value) => setOrderBy(value)} />
                    <TypographyBase
                        sx={{
                            fontWeight: 300,
                        }}
                    >
                        {t("pages.shop.result.showItemsOf", {
                            from: page * perPage - perPage + 1,
                            to: Math.min(page * perPage, totalItems),
                            total: totalItems,
                        })}
                    </TypographyBase>
                    <BoxBase>
                        <ViewModuleIcon
                            sx={{
                                color: currentView === "grid" ? "primary.main" : "primary.dark",
                                fontSize: "30px",
                                cursor: "pointer",
                            }}
                            onClick={() => setCurrentView("grid")}
                        />
                        <ViewListIcon
                            sx={{
                                fontSize: "30px",
                                color: currentView === "list" ? "primary.main" : "primary.dark",
                                cursor: "pointer",
                            }}
                            onClick={() => setCurrentView("list")}
                        />
                    </BoxBase>
                </BoxHorizon>
                <br />

                {currentView === "grid" ? (
                    <ListBook books={books} />
                ) : (
                    <ListBookHorizon books={books} />
                )}
                <br />
                <Paging
                    totalItems={totalItems}
                    itemsPerPage={perPage}
                    page={page}
                    onPageChange={(page) => setPage(page)}
                />
            </>
        );
    }, [books, currentView, page, t, totalItems]);

    return (
        <BoxBase height="100%" flexGrow={1}>
            <IconLoadingBackdrop open={isFetching} />

            {isFetched && !isFetching && books.length === 0 ? (
                <BoxCenter height="500px">
                    <TypographyBase
                        sx={{
                            fontWeight: 300,
                            fontSize: "20px",
                        }}
                    >
                        {t("message.notFoundItem")}
                    </TypographyBase>
                </BoxCenter>
            ) : (
                renderBodyWithContent
            )}
        </BoxBase>
    );
};

export default FilterResult;
