import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AdminState {
    id: string | null;
    email: string | null;
    role: string | null;
    token: string | null;
}

const initialState: AdminState = {
    id: null,
    email: null,
    role: null,
    token: null,
};

const getLocalStorageData = () => {
    if (typeof window !== 'undefined') {
        const localStorageData = localStorage.getItem('adminData');
        return localStorageData ? JSON.parse(localStorageData) : initialState;
    }
    return initialState;
};

const initialAdminState = getLocalStorageData();

const adminSlice = createSlice({
    name: 'admin',
    initialState: initialAdminState,
    reducers: {
        setAdminData(state, action: PayloadAction<{ id: string; email: string; role: string; token: string }>) {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.token = action.payload.token;
            if (typeof window !== 'undefined') {
                localStorage.setItem('adminData', JSON.stringify(action.payload));
            }
        },
        clearAdminData(state) {
            state.id = null;
            state.email = null;
            state.role = null;
            state.token = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('adminData');
            }
        },
    }
});

export const { setAdminData, clearAdminData } = adminSlice.actions;
export default adminSlice.reducer;

