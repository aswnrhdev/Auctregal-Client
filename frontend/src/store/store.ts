import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/features/user/userSlice";
import adminSlice from "@/features/admin/adminSlice";
import { addItem } from "@/features/item/itemSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        admin:adminSlice,
        item:addItem
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;   