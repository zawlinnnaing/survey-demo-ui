import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;
axios.defaults.withCredentials = true;

export default axios;
