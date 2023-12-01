import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { TextField } from "@mui/material";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxCenter from "src/components/Boxs/BoxCenter";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import FilterSectionBase from "src/components/Filters/FilterSections/FilterSectionBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

const MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const STEP = 20000;

const MIN_DISTANCE = 20000;

export interface FilterSectionPriceProps {
    onChange?: (value: number[]) => void;
}

const FilterSectionPrice = ({ onChange }: FilterSectionPriceProps) => {
    const t = useTranslation();

    const [priceRange, setRange] = useState<number[]>([0, MAX_PRICE / 2]);

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
        <FilterSectionBase title={t("pages.shop.filter.price")}>
            <BoxBase>
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
                        alignItems: "stretch",
                        gap: 0.5,
                    }}
                >
                    <TextField
                        fullWidth
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
                            "& input": {
                                px: 1,
                                py: 0.5,
                            },
                        }}
                    >
                        {priceRange[0]}
                    </TextField>
                    <BoxCenter>
                        <TypographyBase variant="body2" fontWeight={600}>
                            -
                        </TypographyBase>
                    </BoxCenter>
                    <TextField
                        fullWidth
                        size="small"
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => {
                            handleChangeRange(
                                e,
                                [
                                    priceRange[0],
                                    Math.max(Number(e.target.value), MIN_PRICE + MIN_DISTANCE),
                                ],
                                1
                            );
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
                            "& input": {
                                px: 1,
                                py: 0.5,
                            },
                        }}
                    >
                        {priceRange[1]}
                    </TextField>
                    <BoxCenter
                        sx={{
                            bgcolor: "primary.main",
                            color: "secondary.main",
                            px: 0.5,
                            cursor: "pointer",
                            "&:hover": {
                                bgcolor: "primary.light",
                            },
                        }}
                        onClick={() => {
                            onChange?.(priceRange);
                        }}
                    >
                        <NavigateNextIcon />
                    </BoxCenter>
                </BoxHorizon>
            </BoxBase>
        </FilterSectionBase>
    );
};

export default FilterSectionPrice;
