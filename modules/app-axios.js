import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;
// console.log(axios.defaults.baseURL);
axios.defaults.withCredentials = true;

axios.setAuthorizationHeader = token => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
};

export default axios;
