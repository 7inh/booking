import { CardMedia } from "@mui/material";
import { PAGE_MAX_WIDTH } from "src/common/const";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import Breadcrumb from "src/components/Breadcrumb/Breadcrumb";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

const About = () => {
    const t = useTranslation();
    return (
        <>
            <Breadcrumb
                links={[
                    {
                        name: t("pages.home.title"),
                        href: "/",
                    },
                    {
                        name: t("pages.about.title"),
                        href: "/about",
                    },
                ]}
            />
            <BoxBase
                sx={{
                    width: PAGE_MAX_WIDTH,
                    mx: "auto",
                }}
            >
                <BoxHorizon py={10}>
                    <CardMedia
                        component="img"
                        src="/images/about.png"
                        sx={{
                            width: "450px",
                            height: "auto",
                        }}
                    />
                    <BoxBase>
                        <TypographyBase
                            sx={{
                                fontSize: "2rem",
                                color: "primary.main",
                            }}
                        >
                            {t("pages.about.whatWeAre.title")}?
                        </TypographyBase>
                        <BoxBase
                            sx={{
                                width: "100px",
                                height: "5px",
                                backgroundColor: "primary.main",
                                my: 2,
                            }}
                        ></BoxBase>
                        <TypographyBase>{t("pages.about.whatWeAre.content")}</TypographyBase>
                    </BoxBase>
                </BoxHorizon>
            </BoxBase>
        </>
    );
};

export default About;
