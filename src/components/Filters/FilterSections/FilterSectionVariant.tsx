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
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { checked } = event.target;
            setVariantValue((prev) => {
                return prev.map((value) => {
                    return {
                        ...value,
                        checkBoxState: checked ? "checked" : "unchecked",
                    };
                });
            });
        },
        [setVariantValue]
    );

    return (
        <FilterSectionBase title={t("pages.shop.filter.variant")}>
            <BoxVertical>
                {variantValue.map((value) => {
                    return (
                        <FormControlLabel
                            key={value.key}
                            label={value.name}
                            control={
                                <Checkbox
                                    size="small"
                                    checked={value.checkBoxState === "checked"}
                                    onChange={handleChangeState}
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
