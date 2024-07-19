import { verifySignup } from "@/interface/interface";
import instance from "../../axios";
import { verifyOtp } from "@/interface/verifyOtp";
import { verifyLogin } from "@/interface/verifyLogin";

export const signupApi = async (data: verifySignup) => {
    try {
        const response = await instance.post('/signup', data)
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const verifyOtpApi = async (data: verifyOtp) => {
    try {
        const response = await instance.post('/verifyOtp', data)
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const verifyLoginApi = async (data: verifyLogin) => {
    try {
        const response = await instance.post('/login', data)
        return response
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const resendOtpApi = async (email: string) => {
    try {
        const response = await instance.post('/resendOtp', { email });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
