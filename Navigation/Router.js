import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./AuthStack";
import BottomTabNavigator from "./BottomTabNavigator";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const Router = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {isAuthenticated ? <BottomTabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};
