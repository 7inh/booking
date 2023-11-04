import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTranslation from "src/hooks/utils/useTranslation";

export interface GroupCardProps {
    organizeId: string;
    groupId: string;
    name: string;
    description: string;
    avatar: string;
    editable?: boolean;
    onOpenEditDialog?: () => void;
    onOpenDeleteDialog?: () => void;
}

const GroupCard = (props: GroupCardProps) => {
    const {
        organizeId,
        groupId,
        name,
        description,
        avatar,
        editable,
        onOpenEditDialog,
        onOpenDeleteDialog,
    } = props;

    const navigate = useNavigate();
    const t = useTranslation();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    return (
        <Card
            sx={{
                width: 250,
                borderRadius: "16px",
                position: "relative",
                boxShadow:
                    "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
                "&:hover": {
                    cursor: "pointer",
                    bgcolor: "rgba(0, 0, 0, 0.04)",
                },
            }}
            onClick={() => {
                if (anchorEl) return;
                navigate(`/private-space/${organizeId}/${groupId}`);
            }}
        >
            <Box>
                {editable ? (
                    <IconButton
                        onClick={(event) => {
                            setAnchorEl(event.currentTarget);
                            event.stopPropagation();
                        }}
                        sx={{
                            position: "absolute",
                            right: 6,
                            top: 6,
                            zIndex: 1,
                        }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                ) : null}
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                    sx={{
                        "& .MuiMenu-paper": {
                            minWidth: "120px",
                        },
                    }}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    slotProps={{
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: "visible",
                                minWidth: 230,
                                boxShadow:
                                    "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)",
                                borderRadius: "0 16px 16px 16px",
                            },
                        },
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                            onOpenEditDialog && onOpenEditDialog();
                        }}
                    >
                        {t("common.edit")}
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                            onOpenDeleteDialog && onOpenDeleteDialog();
                        }}
                    >
                        <Typography color="error">{t("common.deleteGroup")}</Typography>
                    </MenuItem>
                </Menu>
                <Box m={2} display="flex" justifyContent="center">
                    <Avatar
                        src={avatar}
                        sx={{
                            height: "140px",
                            width: "140px",
                            fontSize: "5rem",
                            objectFit: "scale-down",
                        }}
                    >
                        {
                            name
                                .split(" ")
                                .map((word) => word[0])
                                .join("")[0]
                        }
                    </Avatar>
                </Box>
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                            lineHeight: "22px",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}&nbsp;
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
};

export default GroupCard;
