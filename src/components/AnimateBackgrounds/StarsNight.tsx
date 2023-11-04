import BoxBase from "src/components/Boxs/BoxBase";
import "./StarsNight.css";

const StarsNight = () => {
    return (
        <BoxBase
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                maxHeight: "inherit",
                overflow: "hidden",
            }}
        >
            <BoxBase position="relative">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
            </BoxBase>
        </BoxBase>
    );
};

export default StarsNight;
