import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useCallback, useState } from "react";
import useTranslation from "src/hooks/utils/useTranslation";

const MenuHelp = () => {
    const t = useTranslation();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderMenuItems = useCallback((label: string, href: string) => {
        return (
            <MenuItem component="a" href={href} target="_blank">
                <ListItemIcon>
                    <LaunchRoundedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                        fontSize: "14px",
                        fontWeight: 500,
                    }}
                />
            </MenuItem>
        );
    }, []);

    return (
        <>
            <IconButton onClick={handleClick}>
                <HelpOutlineRoundedIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                // anchorOrigin={{ horizontal: "right", vertical: "top" }}
                sx={{
                    marginLeft: 0.5,
                    marginTop: -1.5,
                }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            minWidth: 230,
                            boxShadow:
                                "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)",
                            borderRadius: "16px 16px 0 16px",
                        },
                    },
                }}
            >
                {renderMenuItems(
                    t("help.terms"),
                    "https://kamimind.newai.vn/pages/dieu-khoan-su-dung.html"
                )}
                {renderMenuItems(
                    t("help.paymentMethod"),
                    "https://newai.vn/pages/phuong-thuc-thanh-toan.html"
                )}
                {renderMenuItems(
                    t("help.deliveryPolicy"),
                    "https://newai.vn/pages/chinh-sach-giao-nhan.html"
                )}
                {renderMenuItems(
                    t("help.privacyPolicy"),
                    "https://kamimind.newai.vn/pages/chinh-sach-bao-mat.html"
                )}
                {renderMenuItems(t("help.manualDocument"), "book.kamimind.ai")}
            </Menu>
        </>
    );
};

export default MenuHelp;
