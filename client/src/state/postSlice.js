import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/https"

const initialState = {
  posts: [],
  status: null,
  error: null
};

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.get("posts");

      return result.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)


export const fetchUserPosts = createAsyncThunk(
  "post/fetchUserPosts",
  async (userId, { rejectWithValue }) => {
    try {
      const result = await api.get(
        `posts/${userId}/posts`,
      );

      const sortedPosts = result.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      return sortedPosts
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const sendPost = createAsyncThunk(
  "post/sendPost",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const result = await api.post("posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(setPosts({ posts: result.data }));

      return result.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const patchLike = createAsyncThunk(
  "post/patchLike",
  async ({ userId, postId }, { rejectWithValue, dispatch }) => {
    try {
      const result = await api.patch(
        `http://localhost:3001/posts/${postId}/like`, { userId });

      dispatch(setPost({ post: result.data }));
      return result.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map(post => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "loading"
      state.error = null
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "resolved";
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "rejected"
      state.error = action.payload
    })
    builder.addCase(fetchUserPosts.pending, (state) => {
      state.status = "loading"
      state.error = null
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.status = "resolved";
      state.posts = action.payload;
    });
    builder.addCase(fetchUserPosts.rejected, (state, action) => {
      state.status = "rejected"
      state.error = action.payload
    })
    builder.addCase(sendPost.pending, (state) => {
      state.status = "loading"
      state.error = null
    });
    builder.addCase(sendPost.fulfilled, (state) => {
      state.status = "resolved";
    });
    builder.addCase(sendPost.rejected, (state, action) => {
      state.status = "rejected"
      state.error = action.payload
    })
    builder.addCase(patchLike.rejected, (state, action) => {
      state.status = "rejected"
      state.error = action.payload
    })
  }
})

export const { setPosts, setPost } = postSlice.actions;

export default postSlice.reducer;