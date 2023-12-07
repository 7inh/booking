import { FilterBookType } from "src/common/types";
import FilterSectionCheckBox from "src/components/Filters/FilterSections/FilterSectionCheckBox";
import useTranslation from "src/hooks/utils/useTranslation";

export interface FilterSectionAvailabilityProps {
    filter?: FilterBookType["availability"];
    onChange?: (value: string[]) => void;
}

const FilterSectionAvailability = ({ filter, onChange }: FilterSectionAvailabilityProps) => {
    const t = useTranslation();

    const initialAvailabilityValue = [
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
            title={t("pages.shop.filter.availability")}
            initialCheckBoxValue={initialAvailabilityValue}
            onChange={onChange}
        />
    );
};

export default FilterSectionAvailability;
