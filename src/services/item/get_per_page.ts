import instance from "src/common/instances/instance";
import { ItemGetPerPage } from "src/services/types";

const getPerPage = async (rootPath: string, { page, perPage, filter }: ItemGetPerPage) => {
    return await instance.get(`${rootPath}/get_per_page/${page}/${perPage}`, { params: filter });
};

export default getPerPage;
