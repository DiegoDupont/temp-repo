import axios from "axios";

const axios = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/posts"
});

export default axios;