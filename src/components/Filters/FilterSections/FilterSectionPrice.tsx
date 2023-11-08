import { TextField } from "@mui/material";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import ButtonBase from "src/components/Buttons/ButtonBase";
import FilterSectionBase from "src/components/Filters/FilterSections/FilterSectionBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

const MIN_PRICE = 10000;
const MAX_PRICE = 100000;
const STEP = 10000;

const MIN_DISTANCE = 10000;

const FilterSectionPrice = () => {
    const t = useTranslation();

    const [priceRange, setRange] = useState<number[]>([20000, 70000]);

    const handleChangeRange = (_: any, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < MIN_DISTANCE) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], MAX_PRICE - MIN_DISTANCE);
                setRange([clamped, clamped + MIN_DISTANCE]);
            } else {
                const clamped = Math.max(newValue[1], MIN_DISTANCE);
                setRange([clamped - MIN_DISTANCE, clamped]);
            }
        } else {
            setRange(newValue as number[]);
        }
    };

    return (
        <FilterSectionBase title="Price">
            <BoxBase m={1}>
                <Slider
                    value={priceRange}
                    onChange={handleChangeRange}
                    size="small"
                    valueLabelDisplay="auto"
                    disableSwap
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={STEP}
                />
                <BoxHorizon
                    sx={{
                        justifyContent: "space-between",
                    }}
                >
                    <BoxHorizon gap={0.5}>
                        <TextField
                            size="small"
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => {
                                handleChangeRange(e, [Number(e.target.value), priceRange[1]], 0);
                            }}
                            InputProps={{
                                inputProps: {
                                    min: MIN_PRICE,
                                    max: MAX_PRICE - MIN_DISTANCE,
                                    step: STEP,
                                },
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "primary.main",
                                        borderRadius: "1px",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "primary.main",
                                    },
                                },
                                "& .MuiInputBase-root": {
                                    p: 0,
                                },
                            }}
                        >
                            {priceRange[0]}
                        </TextField>
                    </BoxHorizon>
                    <TypographyBase variant="body2" fontWeight={600}>
                        {t("pages.shop.filter.range")}
                    </TypographyBase>
                    <BoxHorizon>
                        <TextField
                            size="small"
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => {
                                handleChangeRange(e, [priceRange[0], Number(e.target.value)], 1);
                            }}
                            InputProps={{
                                inputProps: {
                                    min: MIN_PRICE + MIN_DISTANCE,
                                    max: MAX_PRICE,
                                    step: STEP,
                                },
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "primary.main",
                                        borderRadius: "1px",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "primary.main",
                                    },
                                },
                                "& .MuiInputBase-root": {
                                    p: 0,
                                },
                            }}
                        >
                            {priceRange[1]}
                        </TextField>
                    </BoxHorizon>
                </BoxHorizon>
                <br />
                <ButtonBase fullWidth label={t("common.filter")} />
            </BoxBase>
        </FilterSectionBase>
    );
};

export default FilterSectionPrice;
