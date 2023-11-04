import { Box, Typography } from "@mui/material";
import Dot from "src/pages/Management/ManagementDetail/PublishBot/components/Dot";
import { getStatusLabelColor } from "src/pages/Management/ManagementDetail/PublishBot/utils";

const TimeDot = ({ state, label }: { state: string; label: string }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                width: "30px",
            }}
        >
            <Dot state={state} />
            <Typography
                sx={{
                    position: "absolute",
                    top: "20px",
                    width: "200px",
                    textAlign: "center",
                    color: getStatusLabelColor(state),
                    fontSize: "14px",
                }}
            >
                {label}
            </Typography>
        </Box>
    );
};

export default TimeDot;
