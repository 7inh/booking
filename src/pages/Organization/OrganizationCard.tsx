import { Avatar, Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export interface OrganizationCardProps {
    organizeId: string;
    name: string;
    description: string;
    avatar: string;
}

const OrganizationCard = (props: OrganizationCardProps) => {
    const { organizeId, name, description, avatar } = props;

    const navigate = useNavigate();

    return (
        <Card
            sx={{
                width: 250,
                borderRadius: "16px",
                boxShadow:
                    "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
            }}
            onClick={() => navigate(`/private-space/${organizeId}`)}
        >
            <CardActionArea
                sx={{
                    height: "100%",
                }}
            >
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
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}&nbsp;
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default OrganizationCard;
