import { Box, CardMedia } from "@mui/material";
import CustomBreadcrumbs from "src/components/CustomBreadcrumbs/CustomBreadcrumbs";
import useTranslation from "src/hooks/utils/useTranslation";
import GiftCodeForm from "src/pages/GiftCode/GiftCodeForm";

const GiftCode = () => {
    const t = useTranslation();

    return (
        <Box px={4} boxSizing="border-box">
            <CustomBreadcrumbs
                heading={t("page.giftCode.title")}
                links={[
                    {
                        href: "/gift-code",
                        name: t("page.giftCode.title"),
                    },
                ]}
            />
            <Box
                sx={{
                    height: "calc(100vh - 164px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gap: 3,
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1fr 1fr",
                        },
                    }}
                >
                    <GiftCodeForm />
                    <CardMedia
                        component="img"
                        src="/svgs/giftCodeLayer.svg"
                        sx={{
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            height: "auto",
                        }}
                    ></CardMedia>
                </Box>
            </Box>
        </Box>
    );
};

export default GiftCode;
