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
        <BoxBase>
            <BoxHorizon
                sx={{
                    userSelect: "none",
                    cursor: "pointer",
                    justifyContent: "space-between",
                }}
                onClick={open.onToggle}
            >
                <TypographyBase variant="h6" color="primary.dark" fontWeight={600}>
                    {title}
                </TypographyBase>
                <ExpandMoreIcon
                    sx={{
                        mr: -0.75,
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
