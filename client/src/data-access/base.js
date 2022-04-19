import clientUtils from "@utils";

export default ({url})=> ({
    get(param) {
        const requestParam = url + param;
        return new Promise((resolve, reject)=> {
            clientUtils.sendRequest("get", requestParam)
                        .then(res => {
                            resolve(res);
                        })
                        .catch(error => {
                            reject(error);
                        });
        })
    },

    post(body) {
        return new Promise((resolve, reject)=> {
            clientUtils.sendRequest("post", url, body)
                        .then(res => {
                            resolve(res);
                        })
                        .catch(err => {
                            reject(err);
                        })
        })
    },

    put({id, body}) {
        const requestParam = `${url}/${id}`;
        return new Promise((resolve, reject)=> {
            clientUtils.sendRequest("put", requestParam, body)
                        .then( res => {
                            resolve(res);
                        })
                        .catch(err => {
                            reject(err);
                        })
        })
    },

    delete(id) {
        const requestParam = `${url}/${id}`;
        return new Promise((resolve, reject)=> {
            clientUtils.sendRequest("delete", requestParam)
                        .then( res => {
                            resolve(res);
                        })
                        .catch(err => {
                            reject(err);
                        })
        })
    }

})