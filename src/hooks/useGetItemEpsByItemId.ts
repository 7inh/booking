import { ItemEpsType } from "src/common/types";
import doQuery from "src/services/services";
import { ItemEpsGetByItemId } from "src/services/types";

export interface UseGetItemEpsByItemIdProps extends ItemEpsGetByItemId {
    onSuccess?: (data: ItemEpsType[]) => void;
}

const useGetItemEpsByItemId = ({ itemId, onSuccess }: UseGetItemEpsByItemIdProps) => {
    const {
        data = [],
        isFetched,
        isFetching,
        refetch,
    } = doQuery({
        entity: "itemEps",
        action: "getByItemId",
        params: {
            itemId: itemId,
        },
        option: {
            enable: !!itemId,
            select: (data) =>
                data?.data.sort((a: ItemEpsType, b: ItemEpsType) => a.eps_no - b.eps_no),
            onSuccess,
        },
    });

    return {
        data,
        isFetched,
        isFetching,
        refetch,
    };
};

export default useGetItemEpsByItemId;
