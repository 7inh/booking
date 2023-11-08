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
            path: "/shop",
        },
        {
            id: 3,
            title: t("nav.about"),
            path: "/about",
        },
        {
            id: 4,
            title: t("nav.contact"),
            path: "/contact",
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
                <BoxHorizon ml={1}>
                    {navData.map((item) => (
                        <LinkBase to={item.path} key={item.id}>
                            <BoxBase
                                sx={{
                                    p: 1,
                                    px: 2,
                                    cursor: "pointer",
                                    "&:hover": {
                                        bgcolor: "primary.dark",
                                    },
                                }}
                            >
                                <TypographyBase
                                    variant="button"
                                    sx={{
                                        color: "white",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {item.title}
                                </TypographyBase>
                            </BoxBase>
                        </LinkBase>
                    ))}
                </BoxHorizon>
            </BoxBase>
        </BoxBase>
    );
};

export default Navbar;
