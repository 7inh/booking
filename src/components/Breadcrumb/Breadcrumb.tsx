import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import LinkBase from "src/components/Links/LinkBase";
import TypographyBase from "src/components/Typographys/TypographyBase";

type Props = {
    links: {
        name: string;
        href: string;
    }[];
};

const Breadcrumb = ({ links }: Props) => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <BoxBase
            sx={{
                bgcolor: "secondary.light",
                position: "relative",
                color: "primary.main",
                py: 3,
                textAlign: "center",
            }}
        >
            <BoxHorizon mx="auto" width="fit-content">
                {links.map((link, index) => {
                    const isLast = index === links.length - 1;
                    const isCurrent = currentPath === link.href;

                    return (
                        <Fragment key={link.href}>
                            <LinkBase to={link.href} disabled={isCurrent}>
                                <BoxBase
                                    width="fit-content"
                                    sx={
                                        !isCurrent
                                            ? {
                                                  "&:hover": {
                                                      color: "primary.dark",
                                                  },
                                              }
                                            : {}
                                    }
                                >
                                    <TypographyBase
                                        sx={{
                                            fontSize: "20px",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {link.name}
                                    </TypographyBase>
                                </BoxBase>
                            </LinkBase>
                            {!isLast && (
                                <BoxBase
                                    sx={{
                                        mx: 1,
                                        fontSize: "20px",
                                        fontWeight: 600,
                                    }}
                                >
                                    /
                                </BoxBase>
                            )}
                        </Fragment>
                    );
                })}
            </BoxHorizon>
        </BoxBase>
    );
};

export default Breadcrumb;
