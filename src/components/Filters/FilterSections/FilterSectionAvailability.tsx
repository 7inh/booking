import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useCallback, useState } from "react";
import { BookDataCustom } from "src/common/types";
import BoxVertical from "src/components/Boxs/BoxVertical";
import FilterSectionBase from "src/components/Filters/FilterSections/FilterSectionBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface FilterSectionAvailabilityProps {
    onChange?: (value: string[]) => void;
}

const FilterSectionAvailability = ({ onChange }: FilterSectionAvailabilityProps) => {
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
            const newState = [...availabilityValue];
            newState[idx].checkBoxState = checked ? "checked" : "unchecked";
            setAvailabilityValue(newState);
            onChange?.(
                newState
                    .filter((value) => value.checkBoxState === "checked")
                    .map((value) => value.key)
            );
        },
        [availabilityValue, onChange]
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
