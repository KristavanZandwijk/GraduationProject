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
  users: [],
  teams: [],
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
    setTeams: (state, action) => {
      state.teams = action.payload;
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
        if (file._id === action.payload._id) return action.payload;
        return file;
      });
      state.files = updatedFiles;
    },
    setBuilding: (state, action) => {
      const updatedBuildings = state.buildings.map((building) => {
        if (building._id === action.payload._id) return action.payload;
        return building;
      });
      state.buildings = updatedBuildings;
    },
    setCompany: (state, action) => {
      const updatedCompanies = state.companies.map((company) => {
        if (company._id === action.payload._id) return action.payload;
        return company;
      });
      state.companies = updatedCompanies;
    },
    setProject: (state, action) => {
      const updatedProjects = state.projects.map((project) => {
        if (project._id === action.payload._id) return action.payload;
        return project;
      });
      state.projects = updatedProjects;
    },

    setTeam: (state, action) => {
      const updatedTeams = state.teams.map((team) => {
        if (team._id === action.payload._id) return action.payload;
        return team;
      });
      state.teams = updatedTeams;
    },



    setUser: (state, action) => {
      const updatedUsers = state.users.map((user) => {
        if (user._id === action.payload._id) return action.payload;
        return user;
      });
      state.users = updatedUsers;
    },
    updateUser: (state, action) => { // Add updateUser reducer
      state.user = action.payload;
    },

    updateCompany: (state, action) => { // Add updateCompany reducer
      state.company = action.payload;
    },

    updateFile: (state, action) => { 
      state.file = action.payload;
    },

    updateProject: (state, action) => { 
      state.project = action.payload;
    },

    updateTeam: (state, action) => { 
      state.team = action.payload;
    },

    updateBuilding: (state, action) => { 
      state.building = action.payload;
    },

    setIfcFile: (state, action) => {
      state.ifcFile = action.payload;
    },

    setTtlFileName: (state, action) => {
      state.ttlFileName= action.payload;
    },

    setIFCFiles: (state, action) => {
      state.IFCFiles= action.payload;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setFiles,
  setBuildings,
  setCompanies,
  setProjects,
  setTeams,
  setUsers,
  setElements,
  setTeam,
  setPost,
  setFile,
  setBuilding,
  setCompany,
  setProject,
  setUser,
  updateUser,
  updateCompany,
  updateProject,
  updateTeam,
  updateFile,
  updateBuilding,
  setIfcFile,
  setTtlFileName,
  setIFCFiles
} = authSlice.actions;

export default authSlice.reducer;