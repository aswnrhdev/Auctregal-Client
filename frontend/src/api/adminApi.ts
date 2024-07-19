import instance from '../../axios';

export const adminLogin = async (email: string, password: string) => {
    try {
        const response = await instance.post('/admin/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

const getAuthHeaders = () => {
    const adminData = localStorage.getItem('adminData');
    const token = adminData ? JSON.parse(adminData).token : '';
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const fetchBiddersApi = async () => {
    try {
        const response = await instance.get('/admin/bidders', getAuthHeaders());
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const blockBidderApi = async (id: string) => {
    try {
        const response = await instance.put(`/admin/block/${id}`, {}, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const unblockBidderApi = async (id: string) => {
    try {
        const response = await instance.put(`/admin/unblock/${id}`, {}, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const fetchSellersApi = async () => {
    try {
        const response = await instance.get('/admin/sellers', getAuthHeaders());
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const blockSellerApi = async (id: string) => {
    try {
        const response = await instance.put(`/admin/block/${id}`, {}, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const unblockSellerApi = async (id: string) => {
    try {
        const response = await instance.put(`/admin/unblock/${id}`, {}, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
