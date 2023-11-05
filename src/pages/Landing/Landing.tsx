import AppBar from "src/components/Appbar/Appbar";
import PopularCollection from "src/components/Boardcasts.tsx/PopularCollection";
import BoxBase from "src/components/Boxs/BoxBase";
import Footer from "src/components/Footer/Footer";
import Branding from "src/pages/Landing/Branding";

const Landing = () => {
    return (
        <BoxBase>
            <AppBar />
            <Branding />
            <br />
            <PopularCollection />
            <br />
            <Footer />
        </BoxBase>
    );
};

export default Landing;
