import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
    const navigate = useNavigate();

    return (
        <IconButton
            sx={{
                position: "fixed",
                top: "20px",
                left: "20px",
                zIndex: 100,
            }}
            onClick={() => {
                navigate(-1);
            }}
        >
            <ArrowBackIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default GoBackButton;
