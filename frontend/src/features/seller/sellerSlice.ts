import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SellerState {
    id: string | null;
    name:string | null
    email: string | null;
    role: string | null;
    token: string | null;
    verified?: boolean;
}

const initialState: SellerState = {
    id: null,
    name:null,
    email: null,
    role: null,
    token: null,
    verified: false,
};

const getLocalStorageData = () => {
    if (typeof window !== 'undefined') {
        const localStorageData = localStorage.getItem('sellerData');
        return localStorageData ? JSON.parse(localStorageData) : initialState;
    }
    return initialState;
};

const initialSellerState = getLocalStorageData();

const sellerSlice = createSlice({
    name: 'seller',
    initialState: initialSellerState,
    reducers: {
        setSellerData(state, action: PayloadAction<{ id: string; name:string; email: string; role: string; token: string }>) {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.token = action.payload.token;
            if (typeof window !== 'undefined') {
                localStorage.setItem('sellerData', JSON.stringify(action.payload));
            }
        },
        setVerified(state, action: PayloadAction<{ verified: boolean }>) {
            state.verified = action.payload.verified;
        },
        clearSellerData(state) {
            state.id = null;
            state.name = null;
            state.email = null;
            state.role = null;
            state.token = null;
            state.verified = false;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('sellerData');
            }
        },
    }
});

export const { clearSellerData, setVerified, setSellerData } = sellerSlice.actions;

export default sellerSlice.reducer;
