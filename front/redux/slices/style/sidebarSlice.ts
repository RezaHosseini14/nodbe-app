import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SidebarType = {
  sidebar: boolean;
};

const initialState: SidebarType = {
  sidebar: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    CHANGE_OPEN_SIDEBAR: (state, action: PayloadAction<any>) => {
      state.sidebar = action.payload;
    },
  },
});

export const { CHANGE_OPEN_SIDEBAR } = sidebarSlice.actions;

export default sidebarSlice.reducer;
