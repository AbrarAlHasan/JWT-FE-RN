import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../Context/AuthContext";
import * as SecureStore from "expo-secure-store";

const Profile = () => {
  const { userDetails, setIsAuthenticated, setUserDetails } =
    useContext(AuthContext);
  console.log("----------", userDetails);

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("refreshToken");
      setUserDetails(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 20 }}>
        {userDetails?.name}
      </Text>
      <Text style={{ marginBottom: 20 }}>{userDetails?.email}</Text>
      <Text style={{ marginBottom: 20 }}>
        {userDetails?.isVerified ? "Account Verified" : "Account not Verified"}
      </Text>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogout}>
        <Text style={{ color: "#fff" }}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#000",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
});

export default Profile;
