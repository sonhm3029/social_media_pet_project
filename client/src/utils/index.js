import axios from "axios";


export default {
    serverUrl: "http://localhost:5000",
    sendRequest(method="get", url, body) {
        let config = {
            method,
            url
        };
        if(method?.toLowerCase() !=="get") {
            config.data = {...body};
        }
        return axios(config);
    }
}

String.prototype.cloudinaryDownloadFormat = function() {
    return this.replace("/upload", "/upload/fl_attachment/")
}