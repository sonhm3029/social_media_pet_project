import baseAccess from "./base";
import api from "@utils/api";
import clientUtils from "@utils";



export default {
    ...baseAccess({url: `${clientUtils.serverUrl}${api.users}`})
}