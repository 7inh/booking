import AppBar from "src/components/Appbar/Appbar";
import BoxBase from "src/components/Boxs/BoxBase";
import Branding from "src/pages/Landing/Branding";

const Landing = () => {
    return (
        <BoxBase>
            <AppBar />
            <Branding />
        </BoxBase>
    );
};

export default Landing;
