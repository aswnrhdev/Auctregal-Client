import axios from "axios";

const instance = axios.create({
    baseURL: 'https://auctregal.rudopedia.shop'
});

export default instance;
