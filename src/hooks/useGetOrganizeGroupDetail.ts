import doQuery from "src/services/services";
import { OrganizeGroupDetailParams } from "src/services/types";

const useGetOrganizeGroupDetail = ({ organizeId, groupId }: OrganizeGroupDetailParams) => {
    const {
        data: response,
        refetch,
        isFetching,
        isFetched,
    } = doQuery({
        entity: "organizeGroup",
        action: "detail",
        params: {
            organizeId,
            groupId,
        },
        option: {
            enable: true,
        },
    });

    return {
        data: response?.data?.data,
        refetch,
        isFetching,
        isFetched,
    };
};

export default useGetOrganizeGroupDetail;
