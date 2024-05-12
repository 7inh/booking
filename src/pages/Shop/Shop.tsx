import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PAGE_MAX_WIDTH } from "src/common/const";
import { FilterBookType } from "src/common/types";
import { getPriceFilterFromParams } from "src/common/utils";
import BoxBase from "src/components/Boxs/BoxBase";
import Breadcrumb from "src/components/Breadcrumb/Breadcrumb";
import FilterBook from "src/components/Filters/FilterBook";
import FilterBookSmall from "src/components/Filters/FilterBookSmall";
import FilterResult from "src/components/Filters/FilterResult";
import { useResponsive } from "src/hooks/utils/useResponsive";
import useTranslation from "src/hooks/utils/useTranslation";
import { useUpdateEffect } from "src/hooks/utils/useUpdateEffect";

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const t = useTranslation();

    const isSmall = useResponsive("down", 920);

    const [filter, setFilter] = useState<FilterBookType>({
        availability: searchParams.get("availability")?.split(",") || [],
        variant: [],
        rare: [],
        format: [],
        price: getPriceFilterFromParams(searchParams.get("price")),
    });

    const handleChangeRare = useCallback(
        (value: string[]) => {
            setFilter((prev) => ({
                ...prev,
                rare: value,
            }));
            searchParams.set("rare", value.join(","));
            setSearchParams(searchParams);
        },
        [searchParams, setSearchParams]
    );

    const handleChangeVariant = useCallback(
        (value: string[]) => {
            setFilter((prev) => ({
                ...prev,
                variant: value,
            }));
            searchParams.set("variant", value.join(","));
            setSearchParams(searchParams);
        },
        [searchParams, setSearchParams]
    );

    const handleChangeFormat = useCallback(
        (value: string[]) => {
            setFilter((prev) => ({
                ...prev,
                format: value,
            }));
            searchParams.set("format", value.join(","));
            setSearchParams(searchParams);
        },
        [searchParams, setSearchParams]
    );

    const handleChangeAvailability = useCallback(
        (value: string[]) => {
            setFilter((prev) => ({
                ...prev,
                availability: value,
            }));
            searchParams.set("availability", value.join(","));
            setSearchParams(searchParams);
        },
        [searchParams, setSearchParams]
    );

    const handleChangePrice = useCallback(
        (value: number[] | undefined) => {
            setFilter((prev) => ({
                ...prev,
                price: value ? [value[0], value[1]] : undefined,
            }));
            if (value) searchParams.set("price", value.join(","));
            else searchParams.delete("price");
            setSearchParams(searchParams);
        },
        [searchParams, setSearchParams]
    );

    useUpdateEffect(() => {
        window.dispatchEvent(new CustomEvent("clear-page"));
    }, [filter]);

    return (
        <>
            <Breadcrumb
                links={[
                    {
                        name: t("pages.home.title"),
                        href: "/",
                    },
                    {
                        name: t("pages.shop.title"),
                        href: "/shop",
                    },
                ]}
            />
            <BoxBase
                sx={{
                    maxWidth: PAGE_MAX_WIDTH,
                    mx: "auto",
                    mt: 2,
                    mb: 5,
                }}
            >
                <BoxBase
                    mx={1}
                    sx={{
                        gap: 3,
                        display: "grid",
                        gridTemplateColumns: isSmall ? "1fr" : "265px 1fr",
                    }}
                >
                    {isSmall ? (
                        <FilterBookSmall
                            filter={filter}
                            onChangeRare={handleChangeRare}
                            onChangeVariant={handleChangeVariant}
                            onChangeAvailability={handleChangeAvailability}
                            onChangePrice={handleChangePrice}
                            onChangeFormat={handleChangeFormat}
                        />
                    ) : (
                        <FilterBook
                            filter={filter}
                            onChangeRare={handleChangeRare}
                            onChangeVariant={handleChangeVariant}
                            onChangeAvailability={handleChangeAvailability}
                            onChangePrice={handleChangePrice}
                            onChangeFormat={handleChangeFormat}
                        />
                    )}
                    <FilterResult filter={filter} />
                </BoxBase>
            </BoxBase>
        </>
    );
};

export default Shop;
