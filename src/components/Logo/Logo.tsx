import { CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import TypographyBase from "src/components/Typographys/TypographyBase";

export interface LogoProps {
    footer?: boolean;
    size?: "small" | "medium" | "large";
}

const Logo = ({ footer, size }: LogoProps) => {
    const navigate = useNavigate();

    return (
        <BoxBase
            sx={{
                height: "100%",
                py: size === "small" ? 0 : 1,
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
            }}
            onClick={() => navigate("/")}
        >
            <CardMedia
                component="img"
                src={footer ? "/svgs/logo_dark.svg" : "/svgs/logo.svg"}
                sx={{
                    height: "auto",
                    width: size === "small" ? "27px" : "35px",
                    color: "primary.main",
                    mr: 1,
                }}
            />
            <BoxHorizon>
                <TypographyBase
                    sx={{
                        color: footer ? "secondary.light" : "primary.dark",
                        fontWeight: "bold",
                        fontSize: size === "small" ? "1.2rem" : "1.5rem",
                    }}
                >
                    SUM
                </TypographyBase>
                <TypographyBase
                    sx={{
                        color: "primary.main",
                        fontWeight: "bold",
                        fontSize: size === "small" ? "1.2rem" : "1.5rem",
                    }}
                >
                    SUE
                </TypographyBase>
            </BoxHorizon>
        </BoxBase>
    );
};

export default Logo;
