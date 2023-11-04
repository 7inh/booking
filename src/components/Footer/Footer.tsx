import { Divider } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import StarsNight from "src/components/AnimateBackgrounds/StarsNight";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import BoxVertical from "src/components/Boxs/BoxVertical";
import ButtonBase from "src/components/Buttons/ButtonBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import { PAGE_MAX_WIDTH } from "src/common/const";

const Footer = () => {
    const t = useTranslation();

    return (
        <BoxBase
            sx={{
                overflow: "hidden",
                position: "relative",
                bgcolor: "primary.dark",
            }}
        >
            <StarsNight />
            <BoxBase
                sx={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 1,
                    boxSizing: "border-box",
                    maxWidth: PAGE_MAX_WIDTH,
                    mx: "auto",
                    height: "100%",
                    minHeight: "220px",
                }}
            >
                <BoxBase>
                    <TypographyBase variant="h4" color="white">
                        XUAO.vn
                    </TypographyBase>

                    <br />
                    <BoxBase
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 300px",
                            gap: "100px",
                        }}
                    >
                        <TypographyBase variant="caption">{t("footer.thanks")}</TypographyBase>
                        <BoxVertical
                            sx={{
                                gap: 0.5,
                            }}
                        >
                            <BoxHorizon gap={1}>
                                <BusinessRoundedIcon />
                                <TypographyBase variant="caption">
                                    Tp. Hồ Chí Minh, Việt Nam
                                </TypographyBase>
                            </BoxHorizon>
                            <BoxHorizon gap={1}>
                                <PhoneIphoneRoundedIcon />
                                <TypographyBase variant="caption">(+84) 946781412</TypographyBase>
                            </BoxHorizon>
                            <BoxHorizon gap={1}>
                                <AlternateEmailRoundedIcon />
                                <TypographyBase variant="caption">example@email.com</TypographyBase>
                            </BoxHorizon>
                        </BoxVertical>
                        <BoxBase>
                            <TypographyBase variant="caption">
                                {t("footer.subscribe")}
                            </TypographyBase>
                            <TextField
                                size="small"
                                placeholder="example@email.com"
                                sx={{
                                    width: "300px",
                                    borderRadius: "4px",
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#E0E0E0",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#E0E0E0",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#E0E0E0",
                                        },
                                    },
                                    "& .MuiInputBase-root": {
                                        pr: 0,
                                    },
                                    overflow: "hidden",
                                }}
                                InputProps={{
                                    sx: {
                                        color: "white",
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <ButtonBase
                                                label={t("common.send")}
                                                sx={{
                                                    borderRadius: "4px 0 0 4px",
                                                    padding: "30px",
                                                    bgcolor: "white",
                                                    color: "primary.dark",
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </BoxBase>
                    </BoxBase>
                </BoxBase>
                <BoxBase>
                    <Divider
                        sx={{
                            bgcolor: "white",
                            opacity: 0.5,
                        }}
                    />
                    <BoxHorizon
                        sx={{
                            zIndex: 2,
                            justifyContent: "space-between",
                        }}
                    >
                        <TypographyBase variant="caption">{t("footer.copyRight")}</TypographyBase>
                        <TypographyBase variant="caption">{t("footer.terms")}</TypographyBase>
                    </BoxHorizon>
                </BoxBase>
            </BoxBase>
        </BoxBase>
    );
};

export default Footer;
