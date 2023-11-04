import AppBar from "src/components/Appbar/Appbar";
import BoxBase from "src/components/Boxs/BoxBase";
import Footer from "src/components/Footer/Footer";
import Branding from "src/pages/Landing/Branding";

const Landing = () => {
    return (
        <BoxBase>
            <AppBar />
            <Branding />
            <br />
            <Footer />
        </BoxBase>
    );
};

export default Landing;
