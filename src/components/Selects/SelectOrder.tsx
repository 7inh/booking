import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import BoxBase from "src/components/Boxs/BoxBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";
import { v4 as uuidv4 } from "uuid";

export interface SelectOrderProps {
    onChange: (value: string) => void;
}

const SelectOrder = ({ onChange }: SelectOrderProps) => {
    const t = useTranslation();
    const options = [
        t("pages.shop.order.newest"),
        t("pages.shop.order.oldest"),
        t("pages.shop.order.priceHighToLow"),
        t("pages.shop.order.priceLowToHigh"),
    ];

    const [value, setValue] = useState(options[0]);

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
        setValue(event.target.value as string);
    };

    return (
        <Select
            value={value}
            size="small"
            onChange={handleChange}
            sx={{
                borderRadius: "1px",
                "& fieldset": {
                    border: "1px solid",
                    borderColor: "primary.dark",
                },
                "&.Mui-focused fieldset": {
                    borderColor: "primary.dark",
                },
                "& .MuiSelect-select": {
                    py: 0,
                    px: 1,
                },
            }}
            renderValue={(selected) => (
                <BoxBase
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 0.5,
                    }}
                >
                    <TypographyBase variant="body1">{selected}</TypographyBase>
                </BoxBase>
            )}
        >
            {options.map((option) => (
                <MenuItem key={uuidv4()} value={option} sx={{}}>
                    <TypographyBase variant="body1">{option}</TypographyBase>
                </MenuItem>
            ))}
        </Select>
    );
};

export default SelectOrder;
