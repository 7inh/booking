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
import { useResponsive } from "src/hooks/utils/useResponsive";
import Logo from "src/components/Logo/Logo";
import useSubscribe from "src/hooks/useSubscribe";
import useSnackBar from "src/hooks/utils/useSnackBar";
import { useCallback, useState } from "react";
import IconLoadingBackdrop from "src/components/Icons/IconLoadingBackdrop";

const Footer = () => {
    const t = useTranslation();
    const snackbar = useSnackBar();

    const mdDown = useResponsive("down", "md");

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const { subscribe } = useSubscribe({
        onSubscribeSuccess: () => {
            snackbar({
                message: t("success.sendEmailSubscribe"),
                severity: "success",
            });
            setEmail("");
            setLoading(false);
        },
    });

    const handleSubscribe = useCallback(async () => {
        setLoading(true);
        await subscribe(email);
    }, [email, subscribe]);

    return (
        <BoxBase
            sx={{
                overflow: "hidden",
                position: "relative",
                bgcolor: "primary.dark",
            }}
        >
            <IconLoadingBackdrop open={loading} />
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
                }}
            >
                <BoxBase>
                    <BoxBase height="120px">
                        <Logo footer />
                    </BoxBase>

                    <BoxBase
                        sx={{
                            display: "grid",
                            gridTemplateColumns: mdDown ? "" : "1fr 1fr 300px",
                            gap: mdDown ? 2 : "100px",
                            textAlign: mdDown ? "center" : "left",
                        }}
                    >
                        <TypographyBase variant="caption">{t("footer.thanks")}</TypographyBase>
                        <BoxVertical
                            sx={{
                                gap: 0.5,
                                alignItems: mdDown ? "center" : "flex-start",
                            }}
                        >
                            <BoxBase width="100%">
                                <TypographyBase variant="h6" color="white">
                                    {t("footer.contact")}
                                </TypographyBase>
                                <Divider
                                    sx={{
                                        bgcolor: "white",
                                        opacity: 0.5,
                                        mb: 1,
                                    }}
                                />
                            </BoxBase>
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
                                <TypographyBase variant="caption">
                                    thanhcong200912@gmail.com
                                </TypographyBase>
                            </BoxHorizon>
                        </BoxVertical>
                        <BoxBase>
                            <TypographyBase variant="h6" color="white">
                                {t("footer.subscribe")}
                            </TypographyBase>
                            <Divider
                                sx={{
                                    bgcolor: "white",
                                    opacity: 0.5,
                                    mb: 1,
                                }}
                            />
                            <TypographyBase variant="caption">
                                {t("footer.subscribeDescription")}
                            </TypographyBase>
                            <br />
                            <br />
                            <TextField
                                size="small"
                                placeholder="example@email.com"
                                sx={{
                                    width: "300px",
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "secondary.main",
                                            borderRadius: "1px",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "secondary.main",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "secondary.main",
                                        },
                                    },
                                    "& .MuiInputBase-root": {
                                        pr: 0,
                                    },
                                    overflow: "hidden",
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{
                                    sx: {
                                        color: "white",
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <ButtonBase
                                                label={t("common.send")}
                                                sx={{
                                                    borderRadius: "1px 0 0 1px",
                                                    border: "none",
                                                    padding: "30px",
                                                    bgcolor: "secondary.main",
                                                    color: "primary.dark",
                                                }}
                                                onClick={handleSubscribe}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </BoxBase>
                    </BoxBase>
                </BoxBase>
                <BoxBase pt={5}>
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
