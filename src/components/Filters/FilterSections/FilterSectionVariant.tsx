import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useCallback, useState } from "react";
import { BookDataCustom } from "src/common/types";
import BoxVertical from "src/components/Boxs/BoxVertical";
import FilterSectionBase from "src/components/Filters/FilterSections/FilterSectionBase";
import useTranslation from "src/hooks/utils/useTranslation";

const FilterSectionVariant = () => {
    const t = useTranslation();

    const [variantValue, setVariantValue] = useState<BookDataCustom[]>([
        {
            key: "once",
            name: t("pages.shop.filter.variantList.once"),
            checkBoxState: "unchecked",
        },
        {
            key: "combo",
            name: t("pages.shop.filter.variantList.combo"),
            checkBoxState: "unchecked",
        },
        {
            key: "fullSet",
            name: t("pages.shop.filter.variantList.fullSet"),
            checkBoxState: "unchecked",
        },
    ]);

    const handleChangeState = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, idx: number) => {
            const { checked } = event.target;
            setVariantValue((prev) => {
                const newState = [...prev];
                newState[idx].checkBoxState = checked ? "checked" : "unchecked";
                return newState;
            });
        },
        [setVariantValue]
    );

    return (
        <FilterSectionBase title={t("pages.shop.filter.variant")}>
            <BoxVertical>
                {variantValue.map((value, idx) => {
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

export default FilterSectionVariant;
