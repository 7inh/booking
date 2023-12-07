import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useCallback, useState } from "react";
import { BookDataCustom } from "src/common/types";
import BoxVertical from "src/components/Boxs/BoxVertical";
import FilterSectionBase from "src/components/Filters/FilterSections/FilterSectionBase";

export interface FilterSectionCheckBoxProps {
    title: string;
    initialCheckBoxValue: BookDataCustom[];
    onChange?: (value: string[]) => void;
}

const FilterSectionCheckBox = ({
    title,
    initialCheckBoxValue,
    onChange,
}: FilterSectionCheckBoxProps) => {
    const [checkboxValue, setCheckBoxValue] = useState<BookDataCustom[]>(initialCheckBoxValue);

    const handleChangeState = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, idx: number) => {
            const { checked } = event.target;
            const newState = [...checkboxValue];
            newState[idx].checkBoxState = checked ? "checked" : "unchecked";
            setCheckBoxValue(newState);
            onChange?.(
                newState
                    .filter((value) => value.checkBoxState === "checked")
                    .map((value) => value.key)
            );
        },
        [checkboxValue, onChange]
    );

    return (
        <FilterSectionBase title={title}>
            <BoxVertical>
                {checkboxValue.map((value, idx) => {
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

export default FilterSectionCheckBox;
