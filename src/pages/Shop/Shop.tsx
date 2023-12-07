import { useState } from "react";
import { PAGE_MAX_WIDTH } from "src/common/const";
import { FilterBookType } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import Breadcrumb from "src/components/Breadcrumb/Breadcrumb";
import FilterBook from "src/components/Filters/FilterBook";
import FilterBookSmall from "src/components/Filters/FilterBookSmall";
import FilterResult from "src/components/Filters/FilterResult";
import { useResponsive } from "src/hooks/utils/useResponsive";
import useTranslation from "src/hooks/utils/useTranslation";

const Shop = () => {
    const t = useTranslation();

    const isSmall = useResponsive("down", 920);

    const [filter, setFilter] = useState<FilterBookType>({
        availability: [],
        variant: [],
        rare: [],
        format: [],
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
                            onChangeFormat={(value) =>
                                setFilter((prev) => ({
                                    ...prev,
                                    format: value,
                                }))
                            }
                        />
                    ) : (
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
                            onChangeFormat={(value) =>
                                setFilter((prev) => ({
                                    ...prev,
                                    format: value,
                                }))
                            }
                        />
                    )}
                    <FilterResult filter={filter} />
                </BoxBase>
            </BoxBase>
        </>
    );
};

export default Shop;
