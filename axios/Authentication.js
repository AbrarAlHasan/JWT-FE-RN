import axios from "./axios";

export const createUser = async (signUpUserDetails) => {
  try {
    const data = await axios.post("/signup", signUpUserDetails);
    return [data.status, data.data];
  } catch (err) {
    console.log(err);
  }
};

export const otpVerify = async (otp) => {
  try {
    const data = await axios.post("/verifyOTP", { otp });
    return [data.status, data.data];
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (credentials) => {
  try {
    const data = await axios.post("/login", credentials);
    return [data.status, data.data];
  } catch (err) {
    console.log(err);
    if (
      (err.response && err.response.status === 401) ||
      err.response.status === 402
    ) {
      return [err.response.status];
    } else console.log("Current Session Error", err);
  }
};

export const checkSession = async (refreshToken) => {
  try {
    const data = await axios.post("/currentSession", { refreshToken });
    // return null;
    return [data.status, data.data];
  } catch (err) {
    if (err.response && err.response.status === 401) {
      return [err.response.status];
    } else console.log("Current Session Error", err);
  }
};

export const forgetPassword = async (email) => {
  try {
    const data = await axios.post("/forgetPassword", { email });
    return [data.status, data.data];
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = async (details) => {
  try {
    const data = await axios.post("/resetPassword", details);
    return [data.status, data.data];
  } catch (err) {
    console.log(err);
  }
};
