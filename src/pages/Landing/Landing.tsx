import Feature from "src/components/Boardcasts.tsx/Feature";
import NewestCollection from "src/components/Boardcasts.tsx/NewestCollection";
import PopularCollection from "src/components/Boardcasts.tsx/PopularCollection";
import RandomBook from "src/components/Boardcasts.tsx/RandomBook";
import UpcomingCollection from "src/components/Boardcasts.tsx/UpcomingCollection";
import BoxBase from "src/components/Boxs/BoxBase";
import Branding from "src/pages/Landing/Branding";

const Landing = () => {
    return (
        <BoxBase>
            <Branding />
            <Feature />
            <RandomBook />
            <PopularCollection />
            <NewestCollection />
            <UpcomingCollection />
        </BoxBase>
    );
};

export default Landing;
