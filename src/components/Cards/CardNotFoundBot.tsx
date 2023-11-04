import { Avatar, Box, Button, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useTranslation from "src/hooks/utils/useTranslation";

const CardNotFoundBot = () => {
    const t = useTranslation();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                "&:before": {
                    content: "''",
                    position: "absolute",
                    top: -55,
                    left: -55,
                    width: 150,
                    height: 150,
                    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                    borderRadius: "50%",
                    filter: "blur(50px)",
                },
                "&:after": {
                    content: "''",
                    position: "absolute",
                    bottom: -95,
                    right: -95,
                    width: 200,
                    height: 200,
                    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                    borderRadius: "50%",
                    filter: "blur(70px)",
                },
                display: "flex",
                justifyContent: "center",
                bgcolor: "#F4F4F4",
                borderRadius: 4,
                py: 3,
            }}
        >
            <Avatar
                sx={{
                    width: "200px",
                    height: "200px",
                    position: "absolute",
                    zIndex: 1,
                    right: "15%",
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
                    right: "10%",
                    zIndex: 1,
                    bottom: "0%",
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
                    right: "32%",
                    zIndex: 1,
                    bottom: "0%",
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
                    py: 2,
                    boxSizing: "border-box",
                    display: "flex",
                    width: "500px",
                    gap: 2,
                    alignItems: "center",
                }}
            >
                <CardMedia
                    component="img"
                    src="/lamp.svg"
                    sx={{
                        maxWidth: "90px",
                    }}
                />
                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ mt: 2 }}>
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
                                variant="caption"
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
        </Box>
    );
};

export default CardNotFoundBot;
