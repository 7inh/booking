import { PAGE_MAX_WIDTH } from "src/common/const";
import BoxBase from "src/components/Boxs/BoxBase";
import FilterBook from "src/components/Filters/FilterBook";

const Shop = () => {
    return (
        <BoxBase
            sx={{
                maxWidth: PAGE_MAX_WIDTH,
                mx: "auto",
            }}
        >
            <BoxBase mx={1}>
                <br />
                <FilterBook />
            </BoxBase>
        </BoxBase>
    );
};

export default Shop;
