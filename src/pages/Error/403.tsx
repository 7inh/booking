import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTranslation from "src/hooks/utils/useTranslation";

const PageError403 = () => {
    const t = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "403 - Forbidden";
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
                    No permission
                </Typography>
                <Box display="flex" gap={1}>
                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#637381",
                        }}
                    >
                        The page you&apos;re trying access has restricted access. <br /> Please
                        refer to your system administrator
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/")}
                        sx={{
                            flexShrink: 0,
                        }}
                    >
                        {t("message.backToHome")}
                    </Button>
                </Box>
                <Box
                    sx={{
                        width: "400px",
                        height: "400px",
                        objectFit: "scale-down",
                        backgroundImage: "url('/403.svg'), url('/403_human.png')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center, 70%",
                        backgroundSize: "contain, 30%",
                    }}
                ></Box>
            </Box>
        </Box>
    );
};

export default PageError403;
