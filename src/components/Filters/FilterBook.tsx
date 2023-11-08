import { Divider } from "@mui/material";
import BoxBase from "src/components/Boxs/BoxBase";
import FilterSectionAvailability from "src/components/Filters/FilterSections/FilterSectionAvailability";
import FilterSectionPrice from "src/components/Filters/FilterSections/FilterSectionPrice";

const FilterBook = () => {
    return (
        <BoxBase maxWidth="300px">
            <FilterSectionPrice />
            <Divider
                sx={{
                    my: 2,
                }}
            />
            <FilterSectionAvailability />
        </BoxBase>
    );
};

export default FilterBook;
