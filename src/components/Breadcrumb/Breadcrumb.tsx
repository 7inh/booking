import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { BreadcrumbsLinkProps } from "src/components/Breadcrumb/types";

type Props = {
    link: BreadcrumbsLinkProps;
    activeLast?: boolean;
    disabled: boolean;
    color?: string;
};

export default function BreadcrumbsLink({ link }: Props) {
    const { name, href, icon, color } = link;

    const styles = {
        typography: "body2",
        alignItems: "center",
        color: color || "#212b36",
        display: "inline-flex",
        textDecoration: "none",
        fontSize: "14px",
        lineHeight: "22px",
    };

    const renderContent = (
        <>
            {icon && (
                <Box
                    component="span"
                    sx={{
                        mr: 1,
                        display: "inherit",
                        "& svg": { width: 20, height: 20 },
                    }}
                >
                    {icon}
                </Box>
            )}

            {name}
        </>
    );

    if (href) {
        return (
            <Link to={href} style={styles}>
                {renderContent}
            </Link>
        );
    }

    return <Box sx={styles}> {renderContent} </Box>;
}
