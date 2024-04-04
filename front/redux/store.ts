import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import themeSlice from "./slices/darkmode/themeSlice";
import sidebarSlice from "./slices/style/sidebarSlice";

const reducer = combineReducers({
  auth: authSlice,
  theme: themeSlice,
  sidebar: sidebarSlice,
});

export const store = configureStore({
  reducer,
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
