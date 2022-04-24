import baseAccess from "./base";
import api from "@utils/api";
import clientUtils from "@utils";
import axios from "axios";


const url = `${clientUtils.serverUrl}${api.upload}`;

export default {
    ...baseAccess({url}),
    
    async uploadFile(file) {
        const formData = new FormData();
        formData.append("selectedFile", file);
        console.log("file", file);
        console.log("formData", formData);
        try {
            const res = await axios({
                method:"post",
                url,
                data: formData,
                headers: {"Content-Type":"multipart/form-data"},
            })
            if(res) return res;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}