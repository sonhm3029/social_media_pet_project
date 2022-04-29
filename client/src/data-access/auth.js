import axios from "axios";

export default {
    async checkAuth(token) {
        const res = await axios({
            method:"post",
            url:"https://socialmediaapp2329.herokuapp.com/verify",
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