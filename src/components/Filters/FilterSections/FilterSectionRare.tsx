import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useCallback, useState } from "react";
import { BookDataCustom } from "src/common/types";
import BoxVertical from "src/components/Boxs/BoxVertical";
import FilterSectionBase from "src/components/Filters/FilterSections/FilterSectionBase";
import useTranslation from "src/hooks/utils/useTranslation";

const FilterSectionRare = () => {
    const t = useTranslation();

    const [rareValue, setRareValue] = useState<BookDataCustom[]>([
        {
            key: "normal",
            name: t("pages.shop.filter.rareList.normal"),
            checkBoxState: "unchecked",
        },
        {
            key: "special",
            name: t("pages.shop.filter.rareList.special"),
            checkBoxState: "unchecked",
        },
        {
            key: "limited",
            name: t("pages.shop.filter.rareList.limited"),
            checkBoxState: "unchecked",
        },
        {
            key: "collection",
            name: t("pages.shop.filter.rareList.collection"),
            checkBoxState: "unchecked",
        },
    ]);

    const handleChangeState = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, idx: number) => {
            const { checked } = event.target;
            setRareValue((prev) => {
                const newState = [...prev];
                newState[idx].checkBoxState = checked ? "checked" : "unchecked";
                return newState;
            });
        },
        [setRareValue]
    );

    return (
        <FilterSectionBase title={t("pages.shop.filter.rare")}>
            <BoxVertical>
                {rareValue.map((value, idx) => {
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

export default FilterSectionRare;
