import doQuery from "src/services/services";

const useGetOrganizeGroupJoined = ({
    organizeId,
    enable,
}: {
    organizeId: string[];
    enable?: boolean;
}) => {
    const {
        data: response,
        refetch,
        isFetching,
    } = doQuery({
        entity: "organizeGroup",
        action: "joined",
        params: {
            organizeId,
        },
        option: {
            enable: Boolean(organizeId) && (enable ?? true),
        },
    });

    return {
        data: response?.data?.data || [],
        refetch,
        isFetching,
    };
};

export default useGetOrganizeGroupJoined;
