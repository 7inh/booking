import { CardMedia } from "@mui/material";
import BoxBase from "src/components/Boxs/BoxBase";

const Logo = () => {
    return (
        <BoxBase
            sx={{
                height: "100%",
                py: 1,
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
            }}
        >
            <CardMedia
                component="img"
                style={{
                    height: "50%",
                    objectFit: "scale-down",
                    width: "auto",
                }}
                src="/svgs/logo.svg"
            />
            <CardMedia
                component="img"
                style={{
                    marginTop: "5px",
                    height: "100%",
                    objectFit: "scale-down",
                    width: "auto",
                }}
                src="/images/logo_temp2.png"
            />
        </BoxBase>
    );
};

export default Logo;
