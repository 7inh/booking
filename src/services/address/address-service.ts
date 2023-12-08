import district from "src/services/address/district";
import price from "src/services/address/price";
import province from "src/services/address/province";
import ward from "src/services/address/ward";
import { AddressDistrict, AddressPrice, AddressProvince, AddressWard } from "src/services/types";

const path = "/address";
const addressService = {
    province: (params: AddressProvince) => province(path, params),
    district: (params: AddressDistrict) => district(path, params),
    ward: (params: AddressWard) => ward(path, params),
    price: (params: AddressPrice) => price(path, params),
};

export default addressService;
