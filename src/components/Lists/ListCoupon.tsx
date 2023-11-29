import { Coupon } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import CardCoupon from "src/components/Cards/CardCoupon/CardCoupon";

export interface ListCouponProps {
    coupons: Coupon[];
}

const ListCoupon = ({ coupons }: ListCouponProps) => {
    return (
        <BoxBase
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                my: 1,
            }}
        >
            {coupons.map((coupon) => (
                <CardCoupon key={coupon.code} coupon={coupon} />
            ))}
        </BoxBase>
    );
};

export default ListCoupon;
