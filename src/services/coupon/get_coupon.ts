import instance from "src/common/instances/instance";
import { CouponGetByCode } from "src/services/types";

const getCoupon = async (rootPath: string, { code, ...params }: CouponGetByCode) => {
    return await instance.get(`${rootPath}/get_coupon/${code}`, { params });
};

export default getCoupon;
