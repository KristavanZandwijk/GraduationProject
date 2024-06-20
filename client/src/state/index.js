import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  files: [],
  buildings: [], // add buildings state
  elements: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
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
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setFiles: (state, action) => {
      state.files = action.payload.files;
    },
    setBuildings: (state, action) => {
      state.buildings = action.payload.buildings; // handle setting buildings
    },

    setElements: (state, action) => {
      state.elements = action.payload.elements;
    },

    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setFile: (state, action) => {
      const updatedFiles = state.files.map((file) => {
        if (file._id === action.payload.file._id) return action.payload.file;
        return file;
      });
      state.files = updatedFiles;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setFiles,
  setFile,
  setBuildings, // export setBuildings action
  setElements,
} = authSlice.actions;

export default authSlice.reducer;
