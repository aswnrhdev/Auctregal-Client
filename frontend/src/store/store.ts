import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/features/user/userSlice";
import adminSlice from "@/features/admin/adminSlice";
import sellerSlice from "@/features/seller/sellerSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        admin:adminSlice,
        seller:sellerSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;