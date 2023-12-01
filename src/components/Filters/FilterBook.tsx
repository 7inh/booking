import { Divider } from "@mui/material";
import BoxBase from "src/components/Boxs/BoxBase";
import FilterSectionAvailability from "src/components/Filters/FilterSections/FilterSectionAvailability";
import FilterSectionPrice from "src/components/Filters/FilterSections/FilterSectionPrice";
import FilterSectionRare from "src/components/Filters/FilterSections/FilterSectionRare";
import FilterSectionVariant from "src/components/Filters/FilterSections/FilterSectionVariant";

export interface FilterBookProps {
    onChangeRare?: (value: string[]) => void;
    onChangeVariant?: (value: string[]) => void;
    onChangeAvailability?: (value: string[]) => void;
    onChangePrice?: (value: number[]) => void;
}

const FilterBook = ({
    onChangeRare,
    onChangeVariant,
    onChangeAvailability,
    onChangePrice,
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
            <FilterSectionPrice onChange={onChangePrice} />
            <Divider
                sx={{
                    my: 2,
                }}
            />
            <FilterSectionAvailability onChange={onChangeAvailability} />
            <Divider
                sx={{
                    my: 2,
                }}
            />
            <FilterSectionVariant onChange={onChangeVariant} />
            <Divider
                sx={{
                    my: 2,
                }}
            />
            <FilterSectionRare onChange={onChangeRare} />
        </BoxBase>
    );
};

export default FilterBook;
