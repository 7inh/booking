import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Box, Collapse, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { useState } from "react";
import { PreviewComment } from "src/common/types";
import Attachment from "src/pages/Management/ManagementDetail/PublishBot/components/Attachment";

export interface CommentCardProps {
    comment: PreviewComment;
}

const CommentCard = (props: CommentCardProps) => {
    const { comment } = props;
    const { previewImg } = comment;

    const [open, setOpen] = useState(false);

    return (
        <Box
            key={comment.id}
            sx={{
                width: "100%",
                borderRadius: "16px",
                boxShadow:
                    "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20);",
                p: 1,
                boxSizing: "border-box",
            }}
        >
            <Box
                display="flex"
                gap={1}
                alignItems="center"
                sx={{
                    cursor: "pointer",
                }}
                onClick={() => setOpen(!open)}
            >
                <Box
                    sx={{
                        color: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <KeyboardArrowDownRoundedIcon
                        sx={{
                            transform: !open ? "rotate(-90deg)" : "rotate(0deg)",
                        }}
                    />
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                        }}
                    >
                        {comment.displayName}
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        color: "#ACACAC",
                        fontSize: "14px",
                        fontWeight: "400",
                    }}
                >
                    {DateTime.fromFormat(comment.createTime, "dd/MM/yyyy HH:mm:ss").toFormat(
                        "HH:mm:ss dd-MM-yyyy"
                    )}
                </Typography>
            </Box>
            <Collapse in={open}>
                <Box
                    sx={{
                        width: "100%",
                        textAlign: "left",
                        p: 1,
                        boxSizing: "border-box",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "14px",
                            color: "#636773",
                        }}
                    >
                        {comment.comment}
                    </Typography>
                    <Box>
                        {previewImg.length > 0 ? (
                            <Attachment
                                previewImg={previewImg.map((img) => ({
                                    src: img,
                                    name: "",
                                }))}
                            />
                        ) : null}
                    </Box>
                </Box>
            </Collapse>
        </Box>
    );
};

export default CommentCard;
