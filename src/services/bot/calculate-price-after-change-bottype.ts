import instance from "src/common/instances/instance";
import { BotCalculatePriceAfterChangeBotTypeParams } from "src/services/types";

const calculatePriceAfterChangeBotType = async (
    rootPath: string,
    params: BotCalculatePriceAfterChangeBotTypeParams
) => {
    return await instance.post(`${rootPath}/calculate_price_after_change_bottype`, params);
};

export default calculatePriceAfterChangeBotType;
