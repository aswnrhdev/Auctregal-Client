import axios from "axios";

const instance = axios.create({
    baseURL: 'https://auctregal-client.vercel.app'
});

export default instance;
