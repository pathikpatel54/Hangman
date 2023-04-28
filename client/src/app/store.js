import { configureStore } from "@reduxjs/toolkit";
import scoresReducer from "../features/score/scoresSlice";

export const store = configureStore({
  reducer: {
    scores: scoresReducer,
  },
});
