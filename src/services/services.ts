import { createMutationService, createQueryService } from "src/services/utils";

export const entityWithAction = {};

export const doQuery = createQueryService(entityWithAction);
export const doMutation = createMutationService(entityWithAction);

export default doQuery;
