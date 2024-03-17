import { Divider } from "@mui/material";
import { FilterBookType } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import FilterSectionAvailability from "src/components/Filters/FilterSections/FilterSectionAvailability";
import FilterSectionFormat from "src/components/Filters/FilterSections/FilterSectionFormat";
import FilterSectionPrice from "src/components/Filters/FilterSections/FilterSectionPrice";
import FilterSectionRare from "src/components/Filters/FilterSections/FilterSectionRare";
import FilterSectionVariant from "src/components/Filters/FilterSections/FilterSectionVariant";

export interface FilterBookProps {
    filter: FilterBookType;
    onChangeRare?: (value: string[]) => void;
    onChangeVariant?: (value: string[]) => void;
    onChangeAvailability?: (value: string[]) => void;
    onChangePrice?: (value?: number[]) => void;
    onChangeFormat?: (value: string[]) => void;
}

const FilterBook = ({
    filter,
    onChangeRare,
    onChangeVariant,
    onChangeAvailability,
    onChangePrice,
    onChangeFormat,
}: FilterBookProps) => {
    return (
        <BoxBase
            width="100%"
            maxWidth="265px"
            flexShrink={0}
            sx={{
                userSelect: "none",
            }}
        >
            <FilterSectionPrice filter={filter["price"]} onChange={onChangePrice} />
            <Divider
                sx={{
                    my: 2,
                }}
            />
            <FilterSectionAvailability
                filter={filter["availability"]}
                onChange={onChangeAvailability}
            />
            <Divider
                sx={{
                    my: 2,
                }}
            />
            <FilterSectionVariant filter={filter["variant"]} onChange={onChangeVariant} />
            <Divider
                sx={{
                    my: 2,
                }}
            />
            <FilterSectionRare filter={filter["rare"]} onChange={onChangeRare} />
            <Divider
                sx={{
                    my: 2,
                }}
            />
            <FilterSectionFormat filter={filter["format"]} onChange={onChangeFormat} />
        </BoxBase>
    );
};

export default FilterBook;
