import instance from "src/common/instances/instance";
import { BotPublishGetMinMaxPriceParams } from "src/services/types";

const publishGetMinMaxPrice = async (
    rootPath: string,
    { botToken }: BotPublishGetMinMaxPriceParams
) => {
    return await instance.get(`${rootPath}/publish/get_min_max_price/${botToken}`);
};

export default publishGetMinMaxPrice;
