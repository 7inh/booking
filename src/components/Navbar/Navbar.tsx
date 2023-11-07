import { PAGE_MAX_WIDTH } from "src/common/const";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import LinkBase from "src/components/Links/LinkBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

const Navbar = () => {
    const t = useTranslation();
    const navData = [
        {
            id: 2,
            title: t("nav.shop"),
        },
        {
            id: 3,
            title: t("nav.about"),
        },
        {
            id: 4,
            title: t("nav.contact"),
        },
    ];

    return (
        <BoxBase
            sx={{
                bgcolor: "primary.main",
                color: "white",
            }}
        >
            <BoxBase
                sx={{
                    maxWidth: PAGE_MAX_WIDTH,
                    mx: "auto",
                }}
            >
                <BoxHorizon ml={2}>
                    {navData.map((item) => (
                        <BoxBase
                            key={item.id}
                            sx={{
                                p: 1,
                                px: 2,
                                cursor: "pointer",
                                "&:hover": {
                                    bgcolor: "primary.dark",
                                },
                            }}
                        >
                            <LinkBase to={""}>
                                <TypographyBase
                                    variant="button"
                                    sx={{
                                        color: "white",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {item.title}
                                </TypographyBase>
                            </LinkBase>
                        </BoxBase>
                    ))}
                </BoxHorizon>
            </BoxBase>
        </BoxBase>
    );
};

export default Navbar;
