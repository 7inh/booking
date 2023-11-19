import itemService from "src/services/item/item-service";
import { createMutationService, createQueryService } from "src/services/utils";

export const entityWithAction = {
    item: itemService,
};

export const doQuery = createQueryService(entityWithAction);
export const doMutation = createMutationService(entityWithAction);

export default doQuery;
