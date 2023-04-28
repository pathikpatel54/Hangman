import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  scores: [],
  status: "idle",
  error: "",
};

export const sendScore = createAsyncThunk("scores/sendScore", async (score) => {
  const response = await axios.post("/api/score", score);
  return response.data;
});

export const fetchScores = createAsyncThunk("scores/fetchScores", async () => {
  const response = await axios.get("/api/scores");
  return response.data;
});

const scoresSlice = createSlice({
  name: "scores",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(sendScore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendScore.fulfilled, (state, action) => {
        state.status = "succeded";
        const index = state.scores.findIndex(
          (score) => score._id === action.payload._id
        );
        if (index !== -1) {
          state.scores[index] = {
            ...state.scores[index],
            ...action.payload,
          };
        } else {
          state.scores.push(action.payload);
        }
      })
      .addCase(sendScore.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchScores.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchScores.fulfilled, (state, action) => {
        state.status = "succeded";
        state.scores = action.payload;
      })
      .addCase(fetchScores.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const selectAllScores = (state) => state.scores.scores;
export const getScoresError = (state) => state.scores.error;
export const getScoresStatus = (state) => state.scores.status;

export default scoresSlice.reducer;
