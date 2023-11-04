import { doQuery } from "../services/services";

const useGetOrganizeMember = ({
    organizeId,
    groupId,
}: {
    organizeId: string;
    groupId?: string;
}) => {
    const {
        data: response,
        refetch,
        isFetching,
    } = doQuery({
        entity: "organizeMember",
        action: "get",
        params: {
            organizeId,
            groupId,
        },
        option: {
            enable: true,
        },
    });

    return {
        data: response?.data?.data || [],
        refetch,
        isFetching,
    };
};

export default useGetOrganizeMember;
