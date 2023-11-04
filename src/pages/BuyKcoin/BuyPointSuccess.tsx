import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomBreadcrumbs from "src/components/CustomBreadcrumbs/CustomBreadcrumbs";
import useTranslation from "src/hooks/utils/useTranslation";

const BuyPointSuccess = () => {
    const t = useTranslation();
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            justifyContent="center"
            height="100%"
            width="100%"
            px={4}
            boxSizing="border-box"
        >
            <Box width="100%" maxWidth="1070px">
                <CustomBreadcrumbs
                    heading={t("page.buyKpoint.title")}
                    links={[
                        {
                            href: "/",
                            name: t("page.home.title"),
                        },
                        {
                            href: "/buy-point",
                            name: t("page.buyKpoint.title"),
                        },
                    ]}
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        sx={{
                            color: "#00A650",
                            fontSize: "24px",
                            fontWeight: 600,
                        }}
                    >
                        {t("page.buyKpoint.yourTransactionIsDone")}
                    </Typography>
                    <br />
                    <Box
                        sx={{
                            background: "url('/svgs/buy-point-success.svg')",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            height: "400px",
                            width: "400px",
                        }}
                    ></Box>
                    <br />
                    <Typography
                        sx={{
                            color: "#4F5E7B",
                            fontSize: "14px",
                            fontWeight: 300,
                        }}
                    >
                        {t("page.buyKpoint.yourPackageIsReady")}
                    </Typography>
                    <br />
                    <Button
                        sx={{
                            textTransform: "none",
                            bgcolor: "primary.main",
                            borderRadius: "8px",
                            height: "40px",
                            px: "20px",
                        }}
                        onClick={() => navigate("/")}
                    >
                        <Typography
                            sx={{
                                color: "white",
                                fontSize: "14px",
                                fontWeight: 500,
                            }}
                        >
                            {t("message.backToHome")}
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default BuyPointSuccess;
