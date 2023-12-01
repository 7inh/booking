import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { OrderBy } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";
import { v4 as uuidv4 } from "uuid";

export interface SelectOrderProps {
    onChange: (value: OrderBy) => void;
}

const mapOrderLabel = (value: OrderBy) => {
    switch (value) {
        case "newest":
            return "pages.shop.order.newest";
        case "oldest":
            return "pages.shop.order.oldest";
        case "priceDesc":
            return "pages.shop.order.priceDesc";
        case "priceAsc":
            return "pages.shop.order.priceAsc";
        case "sale":
            return "pages.shop.order.sale";
        case "discount":
            return "pages.shop.order.discount";
        default:
            return "";
    }
};

const SelectOrder = ({ onChange }: SelectOrderProps) => {
    const t = useTranslation();
    const options: OrderBy[] = ["newest", "oldest", "priceDesc", "priceAsc", "sale", "discount"];

    const [value, setValue] = useState<OrderBy>(options[0]);

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as OrderBy);
        setValue(event.target.value as OrderBy);
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
                    <TypographyBase variant="body1">{t(mapOrderLabel(selected))}</TypographyBase>
                </BoxBase>
            )}
        >
            {options.map((option) => (
                <MenuItem key={uuidv4()} value={option} sx={{}}>
                    <TypographyBase variant="body1">{t(mapOrderLabel(option))}</TypographyBase>
                </MenuItem>
            ))}
        </Select>
    );
};

export default SelectOrder;
