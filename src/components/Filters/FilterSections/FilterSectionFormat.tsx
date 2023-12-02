import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useCallback, useState } from "react";
import { BookDataCustom } from "src/common/types";
import BoxVertical from "src/components/Boxs/BoxVertical";
import FilterSectionBase from "src/components/Filters/FilterSections/FilterSectionBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface FilterSectionFormatProps {
    onChange?: (value: string[]) => void;
}

const FilterSectionFormat = ({ onChange }: FilterSectionFormatProps) => {
    const t = useTranslation();

    const [formatValue, setFormatValue] = useState<BookDataCustom[]>([
        {
            key: "paperback",
            name: t("pages.shop.filter.formatList.paperback"),
            checkBoxState: "unchecked",
        },
        {
            key: "hardcover",
            name: t("pages.shop.filter.formatList.hardcover"),
            checkBoxState: "unchecked",
        },
    ]);

    const handleChangeState = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, idx: number) => {
            const { checked } = event.target;
            const newState = [...formatValue];
            newState[idx].checkBoxState = checked ? "checked" : "unchecked";
            setFormatValue(newState);
            onChange?.(
                newState
                    .filter((value) => value.checkBoxState === "checked")
                    .map((value) => value.key)
            );
        },
        [formatValue, onChange]
    );

    return (
        <FilterSectionBase title={t("pages.shop.filter.format")}>
            <BoxVertical>
                {formatValue.map((value, idx) => {
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

export default FilterSectionFormat;
