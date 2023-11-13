import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useCallback, useState } from "react";
import { BookDataCustom } from "src/common/types";
import BoxVertical from "src/components/Boxs/BoxVertical";
import FilterSectionBase from "src/components/Filters/FilterSections/FilterSectionBase";
import useTranslation from "src/hooks/utils/useTranslation";

const FilterSectionAvailability = () => {
    const t = useTranslation();

    const [availabilityValue, setAvailabilityValue] = useState<BookDataCustom[]>([
        {
            key: "available",
            name: t("pages.shop.filter.availabilityList.available"),
            checkBoxState: "unchecked",
        },
        {
            key: "preOrder",
            name: t("pages.shop.filter.availabilityList.preOrder"),
            checkBoxState: "unchecked",
        },
    ]);

    const handleChangeState = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, idx: number) => {
            const { checked } = event.target;
            setAvailabilityValue((prev) => {
                const newState = [...prev];
                newState[idx].checkBoxState = checked ? "checked" : "unchecked";
                return newState;
            });
        },
        [setAvailabilityValue]
    );

    return (
        <FilterSectionBase title={t("pages.shop.filter.availability")}>
            <BoxVertical>
                {availabilityValue.map((value, idx) => {
                    return (
                        <FormControlLabel
                            key={value.key}
                            label={value.name}
                            control={
                                <Checkbox
                                    size="small"
                                    checked={value.checkBoxState === "checked"}
                                    onChange={(event) => handleChangeState(event, idx)}
                                />
                            }
                        />
                    );
                })}
            </BoxVertical>
        </FilterSectionBase>
    );
};

export default FilterSectionAvailability;
