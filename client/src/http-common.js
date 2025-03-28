import axios from "axios";

const baseURL = `${import.meta.env.VITE_APP_DOMAIN_SERVER}/api/v1`;
console.log("baseURL: ", baseURL);

export default axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true, 
});