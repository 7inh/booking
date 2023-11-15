import { PAGE_MAX_WIDTH } from "src/common/const";
import BoxBase from "src/components/Boxs/BoxBase";
import BoxHorizon from "src/components/Boxs/BoxHorizon";
import Breadcrumb from "src/components/Breadcrumb/Breadcrumb";
import FilterBook from "src/components/Filters/FilterBook";
import FilterResult from "src/components/Filters/FilterResult";

const Shop = () => {
    return (
        <>
            <Breadcrumb
                links={[
                    {
                        name: "Home",
                        href: "/",
                    },
                    {
                        name: "Shop",
                        href: "/shop",
                    },
                ]}
            />
            <BoxBase
                sx={{
                    maxWidth: PAGE_MAX_WIDTH,
                    mx: "auto",
                    mt: 2,
                    mb: 5,
                }}
            >
                <BoxHorizon
                    mx={1}
                    sx={{
                        alignItems: "stretch",
                        gap: 3,
                    }}
                >
                    <FilterBook />
                    <FilterResult />
                </BoxHorizon>
            </BoxBase>
        </>
    );
};

export default Shop;