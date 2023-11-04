import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import AvatarUser from "src/components/Avatars/AvatarUser";
import { IconAccount, IconSignOut } from "src/components/Icons/IconExternal";
import SelectLanguage from "src/components/Selects/SelectLanguage";
import { useAccountContext } from "src/contexts/AccountContext";
import { useNavContext } from "src/contexts/NavContext";
import useTranslation from "src/hooks/utils/useTranslation";

export interface AccountMenuProps {
    account: {
        displayName: string;
        avatar: string;
        email: string;
    };
}

export default function AccountMenu({ account }: AccountMenuProps) {
    const { logOut } = useAccountContext();
    const { open: openSideBar } = useNavContext();
    const navigate = useNavigate();
    const t = useTranslation();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <ListItem
                sx={{
                    minHeight: 48,
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: openSideBar ? "row" : "column",
                    px: 1,
                }}
            >
                <AvatarUser avatar={account.avatar} displayName={account.displayName} />
                <ListItemText
                    primary={account.displayName}
                    secondary={account.email}
                    primaryTypographyProps={{
                        textOverflow: "ellipsis",
                        noWrap: true,
                    }}
                    secondaryTypographyProps={{
                        textOverflow: "ellipsis",
                        noWrap: true,
                    }}
                    sx={{
                        opacity: openSideBar ? 1 : 0,
                        display: openSideBar ? "block" : "none",
                        flexGrow: 1,
                        ml: 1,
                    }}
                />

                <IconButton onClick={handleClick}>
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            </ListItem>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
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
                            borderRadius: "16px 16px 16px 0px",
                        },
                    },
                }}
            >
                <MenuItem
                    onClick={() => {
                        navigate("/account");
                        handleClose();
                    }}
                    sx={{
                        py: 1.5,
                    }}
                >
                    <ListItemIcon>
                        <IconAccount
                            sx={{
                                color: "primary.main",
                            }}
                        />
                    </ListItemIcon>
                    <ListItemText primary={t("page.accountManagement.title")} color="#4F5E7B" />
                </MenuItem>
                <MenuItem
                    sx={{
                        py: 1,
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        "&:hover": {
                            cursor: "unset",
                        },
                    }}
                    disableRipple
                >
                    <SelectLanguage />
                </MenuItem>
                <Divider />
                <MenuItem onClick={logOut}>
                    <ListItemIcon>
                        <IconSignOut
                            sx={{
                                color: "primary.main",
                            }}
                        />
                    </ListItemIcon>
                    <ListItemText primary={t("common.signOut")} />
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
