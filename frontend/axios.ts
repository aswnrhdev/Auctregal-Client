import axios from "axios";
const instance = axios.create({
    baseURL: String('http://localhost:5000')
})

export default instance 