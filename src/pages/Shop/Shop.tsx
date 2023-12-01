import { useState } from "react";
import { PAGE_MAX_WIDTH } from "src/common/const";
import { FilterBookType } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import Breadcrumb from "src/components/Breadcrumb/Breadcrumb";
import FilterBook from "src/components/Filters/FilterBook";
import FilterResult from "src/components/Filters/FilterResult";
import useTranslation from "src/hooks/utils/useTranslation";

const Shop = () => {
    const t = useTranslation();

    const [filter, setFilter] = useState<FilterBookType>({
        availability: [],
        variant: [],
        rare: [],
    });

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
                <BoxHorizon
                    mx={1}
                    sx={{
                        alignItems: "stretch",
                        gap: 3,
                    }}
                >
                    <FilterBook
                        onChangeRare={(value) =>
                            setFilter((prev) => ({
                                ...prev,
                                rare: value,
                            }))
                        }
                        onChangeVariant={(value) =>
                            setFilter((prev) => ({
                                ...prev,
                                variant: value,
                            }))
                        }
                        onChangeAvailability={(value) =>
                            setFilter((prev) => ({
                                ...prev,
                                availability: value,
                            }))
                        }
                        onChangePrice={(value) =>
                            setFilter((prev) => ({
                                ...prev,
                                price: [value[0], value[1]],
                            }))
                        }
                    />
                    <FilterResult filter={filter} />
                </BoxHorizon>
            </BoxBase>
        </>
    );
};

export default Shop;
