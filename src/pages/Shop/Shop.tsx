import { PAGE_MAX_WIDTH } from "src/common/const";
import BoxBase from "src/components/Boxs/BoxBase";
import FilterBook from "src/components/Filters/FilterBook";
import TypographyBase from "src/components/Typographys/TypographyBase";

const Shop = () => {
    return (
        <>
            <BoxBase
                sx={{
                    bgcolor: "secondary.light",
                    position: "relative",
                    color: "primary.main",
                    py: 2,
                    textAlign: "center",
                }}
            >
                <TypographyBase
                    sx={{
                        fontSize: "1rem",
                        fontWeight: 600,
                    }}
                >
                    HOME / SHOP
                </TypographyBase>
            </BoxBase>
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
