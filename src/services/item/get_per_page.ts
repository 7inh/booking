import instance from "src/common/instances/instance";
import { ItemGetPerPage } from "src/services/types";

const getPerPage = async (rootPath: string, { page, perPage }: ItemGetPerPage) => {
    return await instance.get(`${rootPath}/get_per_page/${page}/${perPage}`);
};

export default getPerPage;
