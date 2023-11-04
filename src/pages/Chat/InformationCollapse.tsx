import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { Box, Collapse, Typography } from "@mui/material";
import { useMemo, useState } from "react";

export interface InformationCollapseProps {
    title: string;
    children: React.ReactNode;
}

const InformationCollapse = (props: InformationCollapseProps) => {
    const { title, children } = props;

    const [isExpand, setIsExpand] = useState(true);

    const renderTitle = useMemo(() => {
        return (
            <Box
                bgcolor="#F4F6F8"
                py={1}
                sx={{
                    cursor: "pointer",
                }}
                onClick={() => setIsExpand(!isExpand)}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mx={2}
                    sx={{
                        color: "#637381",
                        userSelect: "none",
                    }}
                >
                    <Typography
                        sx={{
                            textTransform: "uppercase",
                            fontSize: "12px",
                            fontWeight: 500,
                            lineHeight: "18px",
                        }}
                    >
                        {title}
                    </Typography>
                    {!isExpand ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
                </Box>
            </Box>
        );
    }, [isExpand, title]);

    return (
        <>
            {renderTitle}
            <Collapse in={isExpand}>{children}</Collapse>
        </>
    );
};

export default InformationCollapse;
