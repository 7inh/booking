import { PAGE_MAX_WIDTH } from "src/common/const";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import LinkBase from "src/components/Links/LinkBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import useTranslation from "src/hooks/utils/useTranslation";

export interface NavbarProps {
    direction?: "row" | "column";
}

const Navbar = ({ direction }: NavbarProps) => {
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
                bgcolor: direction === "column" ? "transparent" : "primary.main",
            }}
        >
            <BoxBase
                sx={{
                    maxWidth: PAGE_MAX_WIDTH,
                    mx: "auto",
                }}
            >
                <BoxHorizon
                    sx={{
                        ml: direction === "column" ? 0 : 1,
                        flexDirection: direction,
                    }}
                >
                    {navData.map((item) => (
                        <LinkBase
                            to={item.path}
                            key={item.id}
                            style={{
                                width: direction === "column" ? "100%" : "auto",
                            }}
                        >
                            <BoxBase
                                sx={{
                                    p: 1,
                                    px: 2,
                                    cursor: "pointer",
                                    color:
                                        direction === "column" ? "text.primary" : "secondary.light",
                                    "&:hover": {
                                        bgcolor: "primary.dark",
                                        color: "secondary.light",
                                    },
                                }}
                            >
                                <TypographyBase
                                    variant="button"
                                    sx={{
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
