import React, { createContext, useEffect, useState } from "react";
import { ToastMessage } from "../Utils/ToastNotification";
import * as SecureStore from "expo-secure-store";
import { checkSession } from "../axios/Authentication";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      let refreshToken = await SecureStore.getItemAsync("refreshToken");
      if (refreshToken) {
        const response = await checkSession(refreshToken);
        if (response[0] === 200) {
          const decoded = await jwtDecode(response[1].accessToken);
          setUserDetails(decoded.details);
          setIsAuthenticated(true);
        }
        if (response[0] === 401) {
          await SecureStore.deleteItemAsync("refreshToken");
          ToastMessage("Session Expired! Please Login Again");
        }
      }
    } catch (err) {
      console.log("Error", err.message);
    }
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    setUserDetails,
    userDetails,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
