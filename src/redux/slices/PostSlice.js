import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state
// État initial
const initialState = {
  isLoading: false,
  posts: [],
  error: null,
};

export const getData = createAsyncThunk("post/getData", async (_, thunkAPI) => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Create the slice
// Création de la slice
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.isLoading = true;
        console.log("je suis pending");
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
        console.log("je suis fulfilled");
      })
      .addCase(getData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("je suis rejected");
      });
  },
});

export default postSlice.reducer;
