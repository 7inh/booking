import addressService from "src/services/address/address-service";
import couponService from "src/services/coupon/coupon-service";
import itemEpsService from "src/services/item-eps/item-eps-service";
import itemService from "src/services/item/item-service";
import { createMutationService, createQueryService } from "src/services/utils";

export const entityWithAction = {
    item: itemService,
    coupon: couponService,
    address: addressService,
    itemEps: itemEpsService,
};

export const doQuery = createQueryService(entityWithAction);
export const doMutation = createMutationService(entityWithAction);

export default doQuery;
