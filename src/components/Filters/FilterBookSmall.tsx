import BoxBase from "src/components/Boxs/BoxBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useCallback, useMemo, useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import FilterSectionAvailability from "src/components/Filters/FilterSections/FilterSectionAvailability";
import FilterSectionFormat from "src/components/Filters/FilterSections/FilterSectionFormat";
import FilterSectionPrice from "src/components/Filters/FilterSections/FilterSectionPrice";
import FilterSectionRare from "src/components/Filters/FilterSections/FilterSectionRare";
import FilterSectionVariant from "src/components/Filters/FilterSections/FilterSectionVariant";
import Menu from "@mui/material/Menu";
import { FilterBookType } from "src/common/types";

export interface FilterBookSmallProps {
    filter: FilterBookType;
    onChangeRare?: (value: string[]) => void;
    onChangeVariant?: (value: string[]) => void;
    onChangeAvailability?: (value: string[]) => void;
    onChangePrice?: (value: number[]) => void;
    onChangeFormat?: (value: string[]) => void;
}

type FilterBookMappedType = "price" | "availability" | "variant" | "rare" | "format";

const filterComponent: Record<FilterBookMappedType, any> = {
    price: FilterSectionPrice,
    availability: FilterSectionAvailability,
    variant: FilterSectionVariant,
    rare: FilterSectionRare,
    format: FilterSectionFormat,
};

const FilterBookSmall = ({
    filter,
    onChangeRare,
    onChangeVariant,
    onChangeAvailability,
    onChangePrice,
    onChangeFormat,
}: FilterBookSmallProps) => {
    const t = useTranslation();

    const [currentOpenFilter, setCurrentOpenFilter] = useState<FilterBookMappedType | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const mapOnChange = useMemo(() => {
        return {
            price: onChangePrice,
            availability: onChangeAvailability,
            variant: onChangeVariant,
            rare: onChangeRare,
            format: onChangeFormat,
        };
    }, [onChangeAvailability, onChangeFormat, onChangePrice, onChangeRare, onChangeVariant]);

    const renderFilter = useCallback(
        (key: FilterBookMappedType) => {
            return (
                <BoxBase
                    sx={{
                        border: "1px solid #e5e5e5",
                        width: "fit-content",
                        px: 2,
                        py: 1,
                        borderRadius: "50px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1,
                        cursor: "pointer",
                        userSelect: "none",
                    }}
                    onClick={(event) => {
                        setAnchorEl(event.currentTarget);
                        setCurrentOpenFilter(key);
                    }}
                >
                    <TypographyBase variant="body2">{t(`pages.shop.filter.${key}`)}</TypographyBase>
                    <ArrowDropDownIcon fontSize="small" />
                </BoxBase>
            );
        },
        [t]
    );

    const renderMenuFilter = useMemo(() => {
        if (!currentOpenFilter) return null;

        const Component = filterComponent[currentOpenFilter];
        const onChange = mapOnChange[currentOpenFilter];
        const currentFilter = filter[currentOpenFilter];

        return (
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => {
                    setCurrentOpenFilter(null);
                    setAnchorEl(null);
                }}
                sx={{
                    marginTop: "16px",
                    "& .MuiMenu-paper": {
                        width: {
                            xs: "calc(100vw - 32px)",
                            sm: "100%",
                        },
                        maxWidth: "400px",
                        borderRadius: "0px",
                        p: 2,
                        pt: 0,
                        boxSizing: "border-box",
                    },
                }}
            >
                <Component filter={currentFilter} onChange={onChange} />
            </Menu>
        );
    }, [anchorEl, currentOpenFilter, filter, mapOnChange, open]);

    return (
        <BoxBase>
            <BoxHorizon mb={1}>
                <FilterAltOutlinedIcon />
                <TypographyBase variant="h6">{t("common.filter")}</TypographyBase>
            </BoxHorizon>
            <BoxBase
                sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                }}
            >
                {renderFilter("price")}
                {renderFilter("availability")}
                {renderFilter("variant")}
                {renderFilter("rare")}
                {renderFilter("format")}
                {renderMenuFilter}
            </BoxBase>
        </BoxBase>
    );
};

export default FilterBookSmall;
