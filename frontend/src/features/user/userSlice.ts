import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    id: string | null;
    name: string | null;
    email: string | null;
    role: string | null;
    token: string | null;
    verified?: boolean;
    auctCode?: string | null;
}

const initialState: UserState = {
    id: null,
    name: null,
    email: null,
    role: null,
    token: null,
    verified: false,
    auctCode: null,
};

const getLocalStorageData = () => {
    if (typeof window !== 'undefined') {
        const localStorageData = localStorage.getItem('userData');
        return localStorageData ? JSON.parse(localStorageData) : initialState;
    }
    return initialState;
};

const initialUserState = getLocalStorageData();

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUserData(state, action: PayloadAction<{ id: string; name: string; email: string; role: string; token: string; auctCode?: string }>) {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.token = action.payload.token;
            state.auctCode = action.payload.auctCode || null;
            if (typeof window !== 'undefined') {
                localStorage.setItem('userData', JSON.stringify(action.payload));
            }
        },
        setVerified(state, action: PayloadAction<{ verified: boolean }>) {
            state.verified = action.payload.verified;
        },
        clearUserData(state) {
            state.id = null;
            state.name = null;
            state.email = null;
            state.role = null;
            state.token = null;
            state.verified = false;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('userData');
            }
        },
    }
});

export const { clearUserData, setVerified, setUserData } = userSlice.actions;

export default userSlice.reducer;
