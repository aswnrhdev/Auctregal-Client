import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItemState {
  items: any[];
}

const initialState: ItemState = {
  items: [],
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<any>) {
      state.items.push(action.payload);
    },
    // Add other reducers as needed
  }
});

export const { addItem } = itemSlice.actions;
export default itemSlice.reducer;