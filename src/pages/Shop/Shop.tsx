import { PAGE_MAX_WIDTH } from "src/common/const";
import BoxBase from "src/components/Boxs/BoxBase";
import Breadcrumb from "src/components/Breadcrumb/Breadcrumb";
import FilterBook from "src/components/Filters/FilterBook";

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
                }}
            >
                <BoxBase mx={1}>
                    <FilterBook />
                </BoxBase>
            </BoxBase>
        </>
    );
};

export default Shop;
