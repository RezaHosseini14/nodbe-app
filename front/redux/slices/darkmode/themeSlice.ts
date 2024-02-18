import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ThemeType = {
  theme: boolean;
};

const initialState: ThemeType = {
  theme: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    CHANGE_THEME: (state, action: PayloadAction<any>) => {
      state.theme = action.payload;
    },
  },
});

export const { CHANGE_THEME } = themeSlice.actions;

export default themeSlice.reducer;
