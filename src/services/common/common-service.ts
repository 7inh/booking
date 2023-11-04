import city from "src/services/common/city";
import country from "src/services/common/country";
import district from "src/services/common/district";
import kcoin from "src/services/common/kcoin";
import llm from "src/services/common/llm";
import ward from "src/services/common/ward";
import {
    CommonCityParams,
    CommonCountryParams,
    CommonDistrictParams,
    CommonKCoinParams,
    CommonLLMParams,
    CommonWardParams,
} from "src/services/types";

const path = "/common";
const commonService = {
    country: async (params: CommonCountryParams) => country(path, params),
    city: async (params: CommonCityParams) => city(path, params),
    district: async (params: CommonDistrictParams) => district(path, params),
    ward: async (params: CommonWardParams) => ward(path, params),
    llm: async (params: CommonLLMParams) => llm(path, params),
    kcoin: async (params: CommonKCoinParams) => kcoin(path, params),
};

export default commonService;
