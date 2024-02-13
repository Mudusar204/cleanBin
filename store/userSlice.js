import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

export const getUserDetails = createAsyncThunk(
  "userSlice/getUserDetails",
  async () => {
    try {
      let userId = await localStorage.getItem("userId");

      console.log("function chala", userId);
      const response = await axios.post("/api/user/getUser", {
        userId: userId,
      });
      return response.data;
    } catch (error) {
      // @ts-ignore
      throw new Error(error.response.data.error || "Something went wrong");
    }
  }
);

export const signup = createAsyncThunk("userSlice/signup", async (userData) => {
  try {
    console.log("function chala signup wala");
    const response = await axios.post("/api/auth/signup", userData);
    localStorage.setItem("userId", response.data.data._id);

    return response.data;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.response.data.error || "Something went wrong");

    // return error.response.data;
  }
});

export const login = createAsyncThunk("userSlice/login", async (userData) => {
  try {
    console.log("function chala login wala ");
    const response = await axios.post("/api/auth/login", userData);
    console.log(response.data, "response ");
    localStorage.setItem("userId", response.data.data._id);

    return response.data;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.response.data.error || "Something went wrong");
  }
});


export const addCleanings = createAsyncThunk("userSlice/addCleanings", async (plan) => {
  try {
    let id=localStorage.getItem("userId")
    console.log("function chala cleaing add wala ");
    const response = await axios.post("/api/user/addCleanings", {plan: plan,userId:id});
    console.log(response.data, "response ");

    return response.data;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.response.data.error || "Something went wrong");
  }
});

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: {},
    isUserLogin: false,
  },
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload, "from store");
      state.user = action.payload;
    },
    setUserLogin: (state, action) => {
      state.isUserLogin = action.payload;
    },
    deleteUser: (state, action) => {
      state.user = {};
    },
  },
});

export const { setUser, deleteUser,setUserLogin } = userSlice.actions;

export default userSlice.reducer;
