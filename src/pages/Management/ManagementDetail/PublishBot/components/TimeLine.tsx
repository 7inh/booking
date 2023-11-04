import { Box } from "@mui/material";

const TimeLine = ({ state }: { state: "waiting" | "passed" }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                height: "8px",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "2px",
                    backgroundColor: state === "waiting" ? "#E9ECEE" : "#4CAF50",
                }}
            />
        </Box>
    );
};

export default TimeLine;
