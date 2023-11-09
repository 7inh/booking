import { Divider } from "@mui/material";
import BoxBase from "src/components/Boxs/BoxBase";
import FilterSectionAvailability from "src/components/Filters/FilterSections/FilterSectionAvailability";
import FilterSectionPrice from "src/components/Filters/FilterSections/FilterSectionPrice";
import FilterSectionRare from "src/components/Filters/FilterSections/FilterSectionRare";
import FilterSectionVariant from "src/components/Filters/FilterSections/FilterSectionVariant";

const FilterBook = () => {
    return (
        <BoxBase width="100%" maxWidth="300px" flexShrink={0}>
            <FilterSectionPrice />
            <Divider
                sx={{
                    my: 2,
                }}
            />
            <FilterSectionAvailability />
            <Divider
                sx={{
                    my: 2,
                }}
            />
            <FilterSectionVariant />
            <Divider
                sx={{
                    my: 2,
                }}
            />
            <FilterSectionRare />
        </BoxBase>
    );
};

export default FilterBook;
