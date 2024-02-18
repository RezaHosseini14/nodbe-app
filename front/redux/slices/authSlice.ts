import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type MeType = {
  createdAt: Date;
  first_name: string;
  last_name: string;
  profile: string;
  refresh_token: string;
  roles: [string];
  status: boolean;
  updatedAt: Date;
  username: string;
  __v: number;
  _id: string;
};

type AuthState = {
  me: MeType;
};

const initialState: AuthState = {
  me: {
    createdAt: new Date(),
    first_name: "",
    last_name: "",
    profile: "",
    refresh_token: "",
    roles: [""],
    status: false,
    updatedAt: new Date(),
    username: "",
    __v: 0,
    _id: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    AUTHDATA: (state, action: PayloadAction<any>) => {
      state.me = action.payload;
    },
  },
});

export const { AUTHDATA } = authSlice.actions;

export default authSlice.reducer;
