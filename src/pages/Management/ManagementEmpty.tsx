import { Avatar, Box, Button, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useTranslation from "src/hooks/utils/useTranslation";

const ManagementEmpty = () => {
    const t = useTranslation();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: "relative",
                height: "calc(100vh - 190px)",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    bgcolor: "#FF4B22",
                    width: "100px",
                    height: "100px",
                    zIndex: -1,
                    borderRadius: "50%",
                    filter: "blur(50px)",
                    top: "15%",
                    left: "10%",
                }}
            />
            <CardMedia
                component="img"
                src="/lamp.svg"
                sx={{
                    maxWidth: "90px",
                    position: "absolute",
                    top: "10%",
                    left: "10%",
                }}
            />
            <Avatar
                sx={{
                    width: "300px",
                    height: "300px",
                    position: "absolute",
                    zIndex: 1,
                    right: "5%",
                    bottom: "-50px",
                }}
                imgProps={{
                    sx: {
                        objectFit: "contain",
                    },
                }}
                src={"/ufo.svg"}
                variant="square"
            />
            <Avatar
                sx={{
                    width: "50px",
                    height: "50px",
                    position: "absolute",
                    right: "2%",
                    zIndex: 1,
                    bottom: 0,
                }}
                imgProps={{
                    sx: {
                        objectFit: "contain",
                    },
                }}
                src={"/cactus.svg"}
                variant="square"
            />
            <Avatar
                sx={{
                    width: "30px",
                    height: "30px",
                    position: "absolute",
                    right: "35%",
                    zIndex: 1,
                    bottom: 0,
                }}
                imgProps={{
                    sx: {
                        objectFit: "contain",
                    },
                }}
                src={"/cactus.svg"}
                variant="square"
            />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        mt: 2,
                        textAlign: "center",
                        fontSize: "24px",
                        fontWeight: 400,
                    }}
                >
                    {t("common.youHaveNotAnyBot")}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                    }}
                >
                    <Button
                        variant="outlined"
                        sx={{
                            px: 3,
                            boxShadow: "none",
                            "&:hover": {
                                boxShadow: "none",
                            },
                        }}
                        onClick={() => navigate("/create-bot")}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                textTransform: "none",
                                flexShrink: 0,
                                fontWeight: 600,
                                fontSize: "14px",
                            }}
                        >
                            {t("common.createBot")}
                        </Typography>
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            px: 3,
                            boxShadow: "none",
                            "&:hover": {
                                boxShadow: "none",
                            },
                        }}
                        onClick={() => navigate("/kami-store")}
                    >
                        <Typography
                            sx={{
                                textTransform: "none",
                                flexShrink: 0,
                                fontWeight: 600,
                                fontSize: "14px",
                            }}
                        >
                            {t("common.kamiStore")}
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ManagementEmpty;
