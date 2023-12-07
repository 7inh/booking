import { FilterBookType } from "src/common/types";
import FilterSectionCheckBox from "src/components/Filters/FilterSections/FilterSectionCheckBox";
import useTranslation from "src/hooks/utils/useTranslation";

export interface FilterSectionFormatProps {
    filter?: FilterBookType["format"];
    onChange?: (value: string[]) => void;
}

const FilterSectionFormat = ({ filter, onChange }: FilterSectionFormatProps) => {
    const t = useTranslation();

    const initialAvailabilityValue = [
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
            title={t("pages.shop.filter.format")}
            initialCheckBoxValue={initialAvailabilityValue}
            onChange={onChange}
        />
    );
};

export default FilterSectionFormat;
