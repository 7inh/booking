import Collapse from "@mui/material/Collapse";
import BoxBase from "src/components/Boxs/BoxBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { useBoolean } from "src/hooks/utils/useBoolean";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BoxHorizon from "src/components/Boxs/BoxHorizon";

export interface FilterSectionBaseProps {
    children: React.ReactNode;
    title: string;
}

const FilterSectionBase = ({ children, title }: FilterSectionBaseProps) => {
    const open = useBoolean(true);

    return (
        <BoxBase
            sx={{
                border: "0.5px solid",
                borderColor: "primary.main",
            }}
        >
            <BoxHorizon
                sx={{
                    bgcolor: "primary.main",
                    userSelect: "none",
                    cursor: "pointer",
                    justifyContent: "space-between",
                    color: "secondary.main",
                    px: 1,
                    py: 0.7,
                }}
                onClick={open.onToggle}
            >
                <TypographyBase variant="h6" fontWeight={600}>
                    {title}
                </TypographyBase>
                <ExpandMoreIcon
                    sx={{
                        transform: open.value ? "rotate(-180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                    }}
                />
            </BoxHorizon>
            <Collapse in={open.value}>{children}</Collapse>
        </BoxBase>
    );
};

export default FilterSectionBase;
