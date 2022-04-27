import axios from "axios";

export default {
    async checkAuth(token) {
        const res = await axios({
            method:"post",
            url:"http://localhost:5000/verify",
            headers: {
                'Authorization':token
            }
        });
        if(res?.data) {
            return true;
        }
        return false;
    }
}