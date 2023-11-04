import { CardMedia } from "@mui/material";
import BoxBase from "src/components/Boxs/BoxBase";

const Logo = () => {
    return (
        <BoxBase
            sx={{
                height: "100%",
                py: 1,
                boxSizing: "border-box",
            }}
        >
            <CardMedia
                component="img"
                style={{
                    height: "100%",
                    objectFit: "scale-down",
                    width: "auto",
                }}
                src="/images/temp_logo.jpeg"
            />
        </BoxBase>
    );
};

export default Logo;
