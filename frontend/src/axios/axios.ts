import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL, // Use the environment variable here
});

export default instance;
