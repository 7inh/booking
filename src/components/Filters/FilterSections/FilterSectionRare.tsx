import { FilterBookType } from "src/common/types";
import FilterSectionCheckBox from "src/components/Filters/FilterSections/FilterSectionCheckBox";
import useTranslation from "src/hooks/utils/useTranslation";

export interface FilterSectionRareProps {
    filter?: FilterBookType["rare"];
    onChange?: (value: string[]) => void;
}

const FilterSectionRare = ({ filter, onChange }: FilterSectionRareProps) => {
    const t = useTranslation();

    const initialAvailabilityValue = [
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
            title={t("pages.shop.filter.rare")}
            initialCheckBoxValue={initialAvailabilityValue}
            onChange={onChange}
        />
    );
};

export default FilterSectionRare;
