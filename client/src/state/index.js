// client/src/state/index.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
  user: null,
  token: null,
  posts: [],
  files: [],
  buildings: [],
  elements: [],
  companies: [],
  projects: [],
  users:[],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
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
        console.error('user friends non-existent :(');
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setBuildings: (state, action) => {
      state.buildings = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },

    setUsers: (state, action) => {
      state.users = action.payload;
    },


    setElements: (state, action) => {
      state.elements = action.payload;
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
    setBuilding: (state, action) => {
      const updatedBuildings = state.buildings.map((building) => {
        if (building._id === action.payload.building._id) return action.payload.building;
        return building;
      });
      state.buildings = updatedBuildings;
    },
    setCompany: (state, action) => {
      const updatedCompanies = state.companies.map((company) => {
        if (company._id === action.payload.company._id) return action.payload.company;
        return company;
      });
      state.companies = updatedCompanies;
    },
    setProject: (state, action) => {
      const updatedProjects = state.projects.map((project) => {
        if (project._id === action.payload.project._id) return action.payload.project;
        return project;
      });
      state.projects = updatedProjects;
    },
    setElement: (state, action) => {
      const updatedElements = state.elements.map((element) => {
        if (element._id === action.payload.element._id) return action.payload.element;
        return element;
      });
      state.elements = updatedElements;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setUsers,
  setPosts,
  setPost,
  setFiles,
  setFile,
  setBuildings,
  setElements,
  setBuilding,
  setElement,
  setCompany,
  setProject,
  setCompanies,
  setProjects,
} = authSlice.actions;

export default authSlice.reducer;
