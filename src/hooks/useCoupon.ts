import { doMutation } from "src/services/services";

const useCoupon = () => {
    return doMutation({
        entity: "coupon",
        action: "getCoupon",
    });
};

export default useCoupon;
