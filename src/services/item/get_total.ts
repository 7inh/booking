import instance from "src/common/instances/instance";
import { ItemGetTotal } from "src/services/types";

const getTotal = async (rootPath: string, { filter, title }: ItemGetTotal) => {
    return await instance.get(`${rootPath}/get_total`, {
        params: {
            ...filter,
            title,
        },
    });
};

export default getTotal;
