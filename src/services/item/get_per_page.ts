import instance from "src/common/instances/instance";
import { ItemGetPerPage } from "src/services/types";

const getPerPage = async (
    rootPath: string,
    { page, perPage, filter, orderBy, title }: ItemGetPerPage
) => {
    return await instance.get(`${rootPath}/get_per_page/${page}/${perPage}`, {
        params: {
            ...filter,
            orderBy,
            title,
        },
    });
};

export default getPerPage;
