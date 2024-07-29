import { configureStore } from "@reduxjs/toolkit";
import PostSlice from "./slices/PostSlice";
// import counterReducer from './features/counter/counterSlice'; // Assurez-vous d'avoir un réducteur

export const store = configureStore({
  reducer: {
    posts : PostSlice,
  },
});

export default store;
