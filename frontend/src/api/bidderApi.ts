import { verifySignup } from "@/interface/interface";
import instance from "@/axios/axios";
import { verifyOtp } from "@/interface/verifyOtp";
import { verifyLogin } from "@/interface/verifyLogin";

export const signupApi = async (data: verifySignup) => {
    try {
        const response = await instance.post('/signup', data);
        return response;
    } catch (error) {
        console.error('Signup API error:', error);
        throw error; // Rethrow the error to handle it in the calling component
    }
};

export const verifyOtpApi = async (data: verifyOtp) => {
    try {
        const response = await instance.post('/verifyOtp', data);
        return response;
    } catch (error) {
        console.error('Verify OTP API error:', error);
        throw error; // Rethrow the error to handle it in the calling component
    }
};

export const verifyLoginApi = async (data: verifyLogin) => {
    try {
        const response = await instance.post('/login', data);
        return response;
    } catch (error) {
        console.error('Verify Login API error:', error);
        throw error; // Rethrow the error to handle it in the calling component
    }
};

export const resendOtpApi = async (email: string) => {
    try {
        const response = await instance.post('/resendOtp', { email });
        return response;
    } catch (error) {
        console.error('Resend OTP API error:', error);
        throw error; // Rethrow the error to handle it in the calling component
    }
};





export const uploadProfileImageApi = async (data: FormData) => {
    try {
        const response = await instance.post('/uploadProfileImage', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error('Upload profile image API error:', error);
        throw error;
    }
};

export const updateUserApi = async (data: { id: string; name: string }) => {
    try {
        const response = await instance.post('/updateUserName', data);
        return response.data; // Return the data directly
    } catch (error) {
        console.error('Update user API error:', error);
        throw error;
    }
};


export const updateUserAddressApi = async (data: { 
    id: string; 
    name: string;
    street: string; 
    city: string; 
    state: string; 
    zipCode: string; 
    country: string 
}) => {
    try {
        const response = await instance.post('/updateUserAddress', data);
        return response;
    } catch (error) {
        console.error('Update user address API error:', error);
        throw error;
    }
};;

export const addUserAddressApi = async (data: { 
    id: string; 
    street: string; 
    city: string; 
    state: string; 
    zipCode: string; 
    country: string 
}) => {
    try {
        const response = await instance.post('/addUserAddress', data);
        return response;
    } catch (error) {
        console.error('Add user address API error:', error);
        throw error;
    }
};


