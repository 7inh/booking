import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box } from "@mui/material";

const Dot = ({ state }: { state: string }) => {
    if (state === "received" || state == "accept") {
        return (
            <CheckRoundedIcon
                sx={{
                    color: "#64CD87",
                    mt: "-10px",
                }}
            />
        );
    }

    if (state === "deny") {
        return (
            <CloseRoundedIcon
                sx={{
                    color: "#F44336",
                    mt: "-9px",
                }}
            />
        );
    }

    return (
        <Box
            sx={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor:
                    state === "new"
                        ? "#E9ECEE"
                        : state === "received"
                        ? "#64CD87"
                        : state === "processing"
                        ? "#FFC107"
                        : state === "passed"
                        ? "#4CAF50"
                        : "#F44336",
            }}
        />
    );
};

export default Dot;
