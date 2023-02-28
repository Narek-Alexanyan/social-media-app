import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/https"

const initialState = {
  user: null,
  token: null,
  status: null,
  error: null
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (userId, { rejectWithValue }) => {
    try {
      const result = await api.get(`http://localhost:3001/users/${userId}`);

      return result.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getFriends = createAsyncThunk(
  "user/getFriends",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const result = await api.get(`users/${userId}/friends`);

      dispatch(setFriends({ friends: result.data }));

      return result.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (formData, { rejectWithValue }) => {
    try {
      const result = await api.post("auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      return result.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (formData, { rejectWithValue }) => {
    try {
      const result = await api.post("auth/login", formData)

      return result.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(")
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFriends.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    builder.addCase(getFriends.fulfilled, (state) => {
      state.status = "resolved";
    })
    builder.addCase(getFriends.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    })
  }
})

export const { setLogin, setLogout, setFriends } = authSlice.actions;

export default authSlice.reducer;