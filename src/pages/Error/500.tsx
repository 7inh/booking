import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTranslation from "src/hooks/utils/useTranslation";

const PageError500 = () => {
    const navigate = useNavigate();
    const t = useTranslation();

    useEffect(() => {
        document.title = "500 - Internal Server Error";
    }, []);

    return (
        <Box
            width="100vw"
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Box maxWidth="600px" width="100%">
                <Typography
                    sx={{
                        fontWeight: 700,
                        fontSize: "30px",
                        lineHeight: "48px",
                        color: "#212b36",
                    }}
                >
                    500 Internal Server Error
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#637381",
                        mb: 2,
                    }}
                >
                    There was an error, please try again later.
                </Typography>
                <Button variant="outlined" onClick={() => navigate("/")}>
                    {t("message.backToHome")}
                </Button>
                <Box
                    sx={{
                        width: "400px",
                        height: "400px",
                        objectFit: "scale-down",
                        backgroundImage: "url('/500.svg'), url('/500_human.png')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center, 80%",
                        backgroundSize: "contain, 20%",
                    }}
                ></Box>
            </Box>
        </Box>
    );
};

export default PageError500;
