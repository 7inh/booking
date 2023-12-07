import getCoupon from "src/services/coupon/get_coupon";
import { CouponGetByCode } from "src/services/types";

const path = "/coupon";
const couponService = {
    getCoupon: (params: CouponGetByCode) => getCoupon(path, params),
};

export default couponService;
