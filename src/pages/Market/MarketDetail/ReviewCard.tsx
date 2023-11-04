import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { Avatar, Box, BoxProps, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { IconStar } from "src/components/Icons/IconExternal";
import useTranslation from "src/hooks/utils/useTranslation";
import { v4 as uuidv4 } from "uuid";

interface ReviewCardProps extends BoxProps {
    avatar: string;
    displayName: string;
    createTime: string;
    star: number;
    comment: string;
    isOwner?: boolean;
    onClickDelete?: () => void;
    onClickUpdate?: () => void;
}

const ReviewCard = ({
    avatar,
    displayName,
    createTime,
    star,
    comment,
    isOwner,
    onClickDelete,
    onClickUpdate,
}: ReviewCardProps) => {
    const t = useTranslation();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const renderMenuActionOnClick = useMemo(() => {
        const handleClose = () => {
            setAnchorEl(null);
        };

        const onDelete = () => {
            onClickDelete?.();
            handleClose();
        };

        const onUpdateRole = () => {
            onClickUpdate?.();
            handleClose();
        };

        return (
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={onDelete}>
                    <Typography color="error">{t("common.delete")}</Typography>
                </MenuItem>
                <MenuItem onClick={onUpdateRole}>{t("common.edit")}</MenuItem>
            </Menu>
        );
    }, [anchorEl, onClickDelete, onClickUpdate, open, t]);

    return (
        <Box
            sx={{
                boxShadow:
                    "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)",
                borderRadius: "8px",
                px: 2,
                py: 2,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                position: "relative",
            }}
        >
            {isOwner ? (
                <Box
                    sx={{
                        position: "absolute",
                        top: "8px",
                        right: "4px",
                        zIndex: 1,
                    }}
                >
                    <IconButton
                        onClick={(event) => {
                            setAnchorEl(event.currentTarget);
                        }}
                    >
                        <MoreVertRoundedIcon fontSize="small" />
                    </IconButton>
                    {renderMenuActionOnClick}
                </Box>
            ) : null}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                <Avatar
                    src={avatar}
                    sx={{
                        width: "48px",
                        height: "48px",
                    }}
                />
                <Box>
                    <Typography
                        sx={{
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "#212B36",
                        }}
                    >
                        {displayName}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "12px",
                            fontWeight: 400,
                            color: "#919EAB",
                        }}
                    >
                        {DateTime.fromFormat(createTime, "dd/MM/yyyy HH:mm:ss").toFormat(
                            "HH:mm:ss dd-MM-yyyy"
                        )}
                    </Typography>
                </Box>
            </Box>
            <Box mt={1}>
                {Array.from({ length: star }, () => (
                    <IconStar
                        key={uuidv4()}
                        sx={{
                            color: "#FFC107",
                        }}
                    />
                ))}
            </Box>
            <Box>
                <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "22px",
                        color: "#212B36",
                    }}
                >
                    {comment}
                </Typography>
            </Box>
        </Box>
    );
};

export default ReviewCard;
