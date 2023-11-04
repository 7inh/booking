import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { CustomBreadcrumbsProps } from "src/components/CustomBreadcrumbs/types";
import BreadcrumbsLink from "src/components/CustomBreadcrumbs/BreadcrumbsLink";
import { Link } from "react-router-dom";
import { useResponsive } from "src/hooks/utils/useResponsive";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavContext } from "src/contexts/NavContext";

export default function CustomBreadcrumbs({
    links,
    action,
    heading,
    moreLink,
    activeLast,
    sx,
    ...other
}: CustomBreadcrumbsProps) {
    const lgDown = useResponsive("down", "lg");
    const { toggle } = useNavContext();

    const lastLink = links[links.length - 1].name;

    return (
        <Box sx={{ ...sx }} mt={2}>
            <Stack direction="row" alignItems="center">
                <Box sx={{ flexGrow: 1 }}>
                    <Box display="flex" justifyContent="start" alignItems="center" gap={1}>
                        {lgDown ? (
                            <IconButton sx={{ marginLeft: -1.75 }} onClick={toggle}>
                                <MenuIcon />
                            </IconButton>
                        ) : null}
                        {typeof heading === "string" ? (
                            <Typography variant="h4">{heading}</Typography>
                        ) : (
                            heading
                        )}
                    </Box>

                    {!!links.length && (
                        <Breadcrumbs separator={<Separator />} {...other}>
                            {links.map((link) => (
                                <BreadcrumbsLink
                                    key={link.name || ""}
                                    link={link}
                                    activeLast={activeLast}
                                    disabled={link.name === lastLink}
                                    color={link.color}
                                />
                            ))}
                        </Breadcrumbs>
                    )}
                </Box>

                {action && <Box sx={{ flexShrink: 0 }}> {action} </Box>}
            </Stack>

            {!!moreLink && (
                <Box sx={{ mt: 2 }}>
                    {moreLink.map((href) => (
                        <Link key={href} to={href} rel="noopener" style={{ display: "table" }}>
                            {href}
                        </Link>
                    ))}
                </Box>
            )}
        </Box>
    );
}

function Separator() {
    return (
        <Box
            component="span"
            sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "text.disabled" }}
        />
    );
}
