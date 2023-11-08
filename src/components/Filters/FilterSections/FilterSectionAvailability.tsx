import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useCallback, useState } from "react";
import { BookAvailability } from "src/common/types";
import BoxVertical from "src/components/Boxs/BoxVertical";
import FilterSectionBase from "src/components/Filters/FilterSections/FilterSectionBase";
import useTranslation from "src/hooks/utils/useTranslation";

const FilterSectionAvailability = () => {
    const t = useTranslation();

    const [availabilityValue, setAvailabilityValue] = useState<BookAvailability[]>([
        {
            key: "available",
            name: t("pages.shop.filter.availabilityList.available"),
            checkBoxState: "checked",
        },
        {
            key: "preOrder",
            name: t("pages.shop.filter.availabilityList.preOrder"),
            checkBoxState: "checked",
        },
    ]);

    const handleChangeState = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { checked } = event.target;
            setAvailabilityValue((prev) => {
                return prev.map((value) => {
                    return {
                        ...value,
                        checkBoxState: checked ? "checked" : "unchecked",
                    };
                });
            });
        },
        [setAvailabilityValue]
    );

    return (
        <FilterSectionBase title={t("pages.shop.filter.availability")}>
            <BoxVertical>
                {availabilityValue.map((value) => {
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

export default FilterSectionAvailability;
