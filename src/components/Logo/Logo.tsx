import { useNavigate } from "react-router-dom";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import SvgColor from "src/components/SvgColor/SvgColor";
import TypographyBase from "src/components/Typographys/TypographyBase";

export interface LogoProps {
    footer?: boolean;
}

const Logo = ({ footer }: LogoProps) => {
    const navigate = useNavigate();

    return (
        <BoxBase
            sx={{
                height: "100%",
                py: 1,
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
            }}
            onClick={() => navigate("/")}
        >
            <SvgColor
                src="/svgs/logo.svg"
                sx={{
                    height: "50px",
                    width: "50px",
                    color: "primary.main",
                }}
            />
            <BoxHorizon>
                <TypographyBase
                    sx={{
                        color: footer ? "secondary.light" : "primary.dark",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                    }}
                >
                    SUM
                </TypographyBase>
                <TypographyBase
                    sx={{
                        color: "primary.main",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                    }}
                >
                    SUE
                </TypographyBase>
            </BoxHorizon>
        </BoxBase>
    );
};

export default Logo;
