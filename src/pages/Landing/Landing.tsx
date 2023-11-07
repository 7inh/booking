import AppBar from "src/components/Appbar/Appbar";
import Feature from "src/components/Boardcasts.tsx/Feature";
import NewestCollection from "src/components/Boardcasts.tsx/NewestCollection";
import PopularCollection from "src/components/Boardcasts.tsx/PopularCollection";
import RandomBook from "src/components/Boardcasts.tsx/RandomBook";
import UpcomingCollection from "src/components/Boardcasts.tsx/UpcomingCollection";
import BoxBase from "src/components/Boxs/BoxBase";
import Footer from "src/components/Footer/Footer";
import Navbar from "src/components/Navbar/Navbar";
import Branding from "src/pages/Landing/Branding";

const Landing = () => {
    return (
        <BoxBase>
            <AppBar />
            <Navbar />
            <Branding />
            <Feature />
            <RandomBook />
            <PopularCollection />
            <NewestCollection />
            <UpcomingCollection />
            <Footer />
        </BoxBase>
    );
};

export default Landing;
