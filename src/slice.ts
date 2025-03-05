import { createSlice } from "@reduxjs/toolkit";

type todoListState = {
  list: string[];
};

const initialState: todoListState = {
  list: [],
};

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addList: (state, action) => {
      state.list = [...(<[]>state.list), action.payload];
    },
    deleteItem: (state, action) => {
      state.list = state.list.filter((ـ, i: number) => i !== action.payload);
    },

    editItem: (state, action) => {
      state.list[action.payload.index] = action.payload.text;
    },
  },
});

export const { addList, deleteItem, editItem } = todoListSlice.actions;

export default todoListSlice.reducer;
