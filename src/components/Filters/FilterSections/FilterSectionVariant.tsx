import { FilterBookType } from "src/common/types";
import FilterSectionCheckBox from "src/components/Filters/FilterSections/FilterSectionCheckBox";
import useTranslation from "src/hooks/utils/useTranslation";

export interface FilterSectionVariantProps {
    filter?: FilterBookType["variant"];
    onChange?: (value: string[]) => void;
}

const FilterSectionVariant = ({ filter, onChange }: FilterSectionVariantProps) => {
    const t = useTranslation();

    const initialAvailabilityValue = [
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
    ].map((value) => {
        if (filter?.includes(value.key)) {
            return {
                ...value,
                checkBoxState: "checked",
            };
        }
        return value;
    });

    return (
        <FilterSectionCheckBox
            title={t("pages.shop.filter.variant")}
            initialCheckBoxValue={initialAvailabilityValue}
            onChange={onChange}
        />
    );
};

export default FilterSectionVariant;
