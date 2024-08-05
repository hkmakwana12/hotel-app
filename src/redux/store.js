import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import paymentTypeReducer from "./slices/paymentTypeSlice";

import { authApi } from "src/services/authService";
import hotelStore from "src/modules/hotel-management/redux/store";
import settingsStore from "src/modules/settings/redux/store";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    paymentType: paymentTypeReducer,

    ...hotelStore,

    ...settingsStore,

    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
