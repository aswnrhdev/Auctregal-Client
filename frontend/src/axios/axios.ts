import axios from "axios";
import { refreshToken } from "@/api/adminApi";

const instance = axios.create({
    baseURL: 'http://localhost:5000'
});


// instance.interceptors.request.use(
//     async (config) => {
//         const adminData = localStorage.getItem('adminData');
//         if (adminData) {
//             const { token } = JSON.parse(adminData);

//             // Check if the token is expired and refresh it if needed
//             const tokenPayload = JSON.parse(atob(token.split('.')[1]));
//             if (tokenPayload.exp * 1000 < Date.now()) {
//                 try {
//                     const newToken = await refreshToken(); // Refresh token
//                     // Update headers with new token
//                     if (config.headers) {
//                         config.headers['Authorization'] = `Bearer ${newToken}`;
//                     }
//                 } catch (refreshError) {
//                     // Handle error refreshing token
//                     console.error('Error refreshing token:', refreshError);
//                     return Promise.reject(refreshError);
//                 }
//             } else {
//                 // Attach token to request headers
//                 if (config.headers) {
//                     config.headers['Authorization'] = `Bearer ${token}`;
//                 }
//             }
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // Response Interceptor
// instance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const { response } = error;
//         if (response && response.status === 401) {
//             // Token might be expired, attempt to refresh token
//             try {
//                 const newToken = await refreshToken();
//                 // Retry the failed request with the new token
//                 const config = error.config;
//                 if (config.headers) {
//                     config.headers['Authorization'] = `Bearer ${newToken}`;
//                 }
//                 return instance(config);
//             } catch (refreshError) {
//                 console.error('Error refreshing token:', refreshError);
//                 return Promise.reject(refreshError);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

export default instance;
