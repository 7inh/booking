import couponService from "src/services/coupon/coupon-service";
import itemService from "src/services/item/item-service";
import { createMutationService, createQueryService } from "src/services/utils";

export const entityWithAction = {
    item: itemService,
    coupon: couponService,
};

export const doQuery = createQueryService(entityWithAction);
export const doMutation = createMutationService(entityWithAction);

export default doQuery;
