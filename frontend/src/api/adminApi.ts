import instance from "@/axios/adminAxios";

export const adminLogin = async (email: string, password: string) => {
    try {
        const response = await instance.post('/admin/login', { email, password });
        localStorage.setItem('refreshToken', response.data.admin.refreshToken);
        localStorage.setItem('adminData', JSON.stringify({
            token: response.data.admin.token,
            ...response.data.admin                                          
        }));
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token found');

        const response = await instance.post('/admin/refresh-token', { refreshToken });
        const newToken = response.data.token;

        const adminData = localStorage.getItem('adminData');
        if (adminData) {
            const parsedData = JSON.parse(adminData);
            parsedData.token = newToken;
            localStorage.setItem('adminData', JSON.stringify(parsedData));
        }

        return newToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};

export const fetchBiddersApi = async () => {
    try {
        const response = await instance.get('/admin/bidders');
        return response.data;
    } catch (error) {
        console.log('Error fetching bidders:', error);
        throw error;
    }
};

export const blockBidderApi = async (id: string) => {
    try {
        const response = await instance.put(`/admin/block/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error blocking bidder:', error);
        throw error;
    }
};


export const unblockBidderApi = async (id: string) => {
    try {
        const response = await instance.put(`/admin/unblock/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error unblocking bidder:', error);
        throw error;
    }
};


export const fetchSellersApi = async () => {
    try {
        const response = await instance.get('/admin/sellers');
        return response.data;
    } catch (error) {
        console.log('Error fetching sellers:', error);
        throw error;
    }
};

export const blockSellerApi = async (id: string) => {
    try {
        const response = await instance.put(`/admin/block/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error blocking seller:', error);
        throw error;
    }
};

export const unblockSellerApi = async (id: string) => {
    try {
        const response = await instance.put(`/admin/unblock/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error unblocking seller:', error);
        throw error;
    }
};
