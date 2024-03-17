import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { TextField, Tooltip } from "@mui/material";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { FilterBookType } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxCenter from "src/components/Boxs/BoxCenter";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import FilterSectionBase from "src/components/Filters/FilterSections/FilterSectionBase";
import Icon from "src/components/Icons/Icon";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

const MIN_PRICE = 0;
const MAX_PRICE = 10000000;
const STEP = 50000;

const MIN_DISTANCE = STEP;

export interface FilterSectionPriceProps {
    filter?: FilterBookType["price"];
    onChange?: (value?: number[]) => void;
}

const FilterSectionPrice = ({ filter, onChange }: FilterSectionPriceProps) => {
    const t = useTranslation();

    const [priceRange, setRange] = useState<number[]>(filter ? filter : [0, MAX_PRICE]);
    const isFilterApplied = filter && filter[0] === priceRange[0] && filter[1] === priceRange[1];

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
                    <Tooltip
                        title={
                            isFilterApplied
                                ? t("pages.shop.filter.clearFilterPrice")
                                : t("pages.shop.filter.filterByPrice")
                        }
                    >
                        <BoxBase
                            sx={{
                                bgcolor: "primary.main",
                                color: "secondary.main",
                                px: 0.5,
                                cursor: "pointer",
                                "&:hover": {
                                    bgcolor: "primary.light",
                                },
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onClick={() => {
                                if (isFilterApplied) {
                                    setRange([0, MAX_PRICE]);
                                    onChange?.();
                                } else {
                                    onChange?.(priceRange);
                                }
                            }}
                        >
                            {isFilterApplied ? (
                                <Icon
                                    icon="mdi:reload"
                                    sx={{
                                        px: 0.25,
                                    }}
                                />
                            ) : (
                                <NavigateNextIcon />
                            )}
                        </BoxBase>
                    </Tooltip>
                </BoxHorizon>
            </BoxBase>
        </FilterSectionBase>
    );
};

export default FilterSectionPrice;
