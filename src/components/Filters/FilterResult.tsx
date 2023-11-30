import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { useState } from "react";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import ListBook from "src/components/Lists/ListBook";
import ListBookHorizon from "src/components/Lists/ListBookHorizon";
import Paging from "src/components/Paging/Paging";
import SelectOrder from "src/components/Selects/SelectOrder";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useGetItemPerPage from "src/hooks/useGetItemPerPage";
import useGetItemTotal from "src/hooks/useGetItemTotal";
import useTranslation from "src/hooks/utils/useTranslation";

const FilterResult = () => {
    const t = useTranslation();

    const [currentView, setCurrentView] = useState<"grid" | "list">("grid");
    const [page, setPage] = useState(1);

    const { data: books } = useGetItemPerPage({
        page,
        perPage: 9,
    });
    const { data: totalItems } = useGetItemTotal();

    return (
        <BoxBase height="100%" flexGrow={1}>
            <BoxHorizon
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                    mb: 1,
                }}
            >
                <SelectOrder onChange={() => {}} />
                <TypographyBase
                    sx={{
                        fontWeight: 300,
                    }}
                >
                    {t("pages.shop.result.showItemsOf", {
                        from: page * 9 - 8,
                        to: page * 9,
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

            {currentView === "grid" ? (
                <ListBook books={books} />
            ) : (
                <ListBookHorizon books={books} />
            )}
            <br />
            <Paging
                totalItems={totalItems}
                itemsPerPage={9}
                page={page}
                onPageChange={(page) => setPage(page)}
            />
        </BoxBase>
    );
};

export default FilterResult;
