import doQuery from "src/services/services";

export interface UseGetProvinceProps {
    onSuccess?: (data: any) => void;
}

const useGetProvince = (props: UseGetProvinceProps) => {
    const {
        data = [],
        isFetched,
        isFetching,
        refetch,
    } = doQuery({
        entity: "address",
        action: "province",
        params: {},
        option: {
            enable: true,
            onSuccess: props?.onSuccess,
            select: (data) => data?.data,
        },
    });

    return {
        data,
        isFetched,
        isFetching,
        refetch,
    };
};

export default useGetProvince;
