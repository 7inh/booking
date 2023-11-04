import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Menu, MenuItem, Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Iconify from "src/components/Iconify/Iconify";
import { StyledDotIcon, StyledIcon, StyledItem } from "src/components/SideBar/StyledItem";
import { NavConfigProps, NavItemProps } from "src/components/SideBar/types";
import { useBoolean } from "src/hooks/utils/useBoolean";

type Props = NavItemProps & {
    config: NavConfigProps;
    openSideBar: boolean;
};
export default function NavItem({
    item,
    open,
    depth,
    active,
    config,
    openSideBar,
    ...other
}: Props) {
    const { title, path, icon, children, disabled, caption } = item;

    const anchorEl = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const openMenu = useBoolean(false);

    const subItem = depth !== 1;

    const handleClose = (e: any) => {
        if (openSideBar) return;

        const menu = anchorEl.current;
        if (!menu) return;

        const menuBounds = menu.getBoundingClientRect();

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        if (
            mouseX < menuBounds.left ||
            mouseX > menuBounds.right ||
            mouseY < menuBounds.top ||
            mouseY > menuBounds.bottom
        ) {
            const menuList = menuRef.current;
            const menuListBounds = menuList?.querySelector("ul")?.getBoundingClientRect();
            if (menuListBounds) {
                if (
                    mouseX < menuListBounds.x ||
                    mouseX > menuListBounds.x + menuListBounds.width ||
                    mouseY < menuListBounds.y ||
                    mouseY > menuListBounds.y + menuListBounds.height
                ) {
                    openMenu.onFalse();
                }
            }
        } else {
            openMenu.onTrue();
        }
    };

    const renderContent = (
        <StyledItem
            disableGutters
            disabled={disabled}
            active={active}
            depth={depth}
            config={config}
            ref={anchorEl}
            disableRipple={!openSideBar}
            sx={{
                borderRadius: openSideBar ? "8px" : 0,
                px: openSideBar ? 1 : 0,
                mx: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            onMouseMove={handleClose}
            {...other}
        >
            {icon && (
                <StyledIcon
                    size={config.iconSize}
                    sx={{
                        color: active ? "primary.main" : "rgba(161, 161, 161, 1)",
                    }}
                >
                    {icon}
                </StyledIcon>
            )}

            {subItem && (
                <StyledIcon size={config.iconSize}>
                    <StyledDotIcon active={active} />
                </StyledIcon>
            )}

            {!subItem && !!children && !openSideBar && (
                <>
                    <ArrowRightIcon
                        sx={{
                            right: 5,
                            bottom: 0,
                            position: "absolute",
                            transform: "rotate(45deg)",
                        }}
                    />
                    <Menu
                        ref={menuRef}
                        open={openMenu.value}
                        onClose={openMenu.onFalse}
                        anchorEl={anchorEl.current}
                        transformOrigin={{ horizontal: "left", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "top" }}
                    >
                        {children.map((item: any, index: number) => (
                            <Link
                                key={item.path + index}
                                to={item.path}
                                style={{ textDecoration: "none", color: "secondary" }}
                            >
                                <MenuItem
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                    }}
                                >
                                    <StyledDotIcon active={active} />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            alignSelf: "flex-end",
                                            textDecoration: "none",
                                            color: active ? "primary.main" : "text.secondary",
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                </MenuItem>
                            </Link>
                        ))}
                    </Menu>
                </>
            )}

            {!(config.hiddenLabel && !subItem && open) && openSideBar && (
                <ListItemText
                    primary={title}
                    secondary={
                        caption ? (
                            <Tooltip title={caption} placement="top-start">
                                <span>{caption}</span>
                            </Tooltip>
                        ) : null
                    }
                    primaryTypographyProps={{
                        noWrap: true,
                        typography: "body2",
                        textTransform: "capitalize",
                        fontWeight: active ? 600 : 500,
                        sx: {
                            size: "14px",
                            lineHeight: "22px",
                        },
                    }}
                    secondaryTypographyProps={{
                        noWrap: true,
                        component: "span",
                        typography: "caption",
                        color: "text.disabled",
                    }}
                />
            )}

            {!!children && openSideBar && (
                <Iconify
                    width={16}
                    icon={open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"}
                    sx={{ mx: 1, flexShrink: 0 }}
                />
            )}
        </StyledItem>
    );

    if (children) {
        return renderContent;
    }

    return (
        <Link
            to={path}
            target={path.includes("http") ? "_blank" : ""}
            color="inherit"
            style={{ textDecoration: "none" }}
        >
            {renderContent}
        </Link>
    );
}
