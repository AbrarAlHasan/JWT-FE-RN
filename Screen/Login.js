import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ToastMessage } from "../Utils/ToastNotification";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../axios/Authentication";
import { AuthContext } from "../Context/AuthContext";
import jwtDecode from "jwt-decode";
import * as SecureStore from "expo-secure-store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigation = useNavigation();
  const { setIsAuthenticated, setUserDetails } = useContext(AuthContext);

  const validate = () => {
    if (!email) {
      ToastMessage("Please Enter Email");
      return false;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email.trim()) === false) {
      ToastMessage("Email Invalid");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    try {
      if (validate()) {
        const response = await loginUser({ email, password });
        if (response[0] === 200) {
          const decoded = await jwtDecode(response[1].accessToken);
          setUserDetails(decoded?.details);
          await SecureStore.setItemAsync(
            "refreshToken",
            response[1].refreshToken
          );
          setIsAuthenticated(true);
        }
        if (response[0] === 401) {
          ToastMessage("Account Not Verified. Please Verify the Account");
          navigation.navigate("OTP", { pageType: "login" });
        }
        if (response[0] === 402) {
          ToastMessage("Incorrect Email or Password");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50, color: "#000" }}>Welcome</Text>
      <Text style={{ fontSize: 20, color: "#000", marginBottom: 40 }}>
        Please login to Continue
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#c2c2c2"
          autoCapitalize="none"
          color="#fff"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#c2c2c2"
          color="#fff"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPass}
        />
        <TouchableOpacity
          style={{ position: "absolute", right: 10 }}
          onPress={() => setShowPass(!showPass)}
        >
          <Text>{showPass ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPass")}>
        <Text style={{ color: "#000" }}>Forgot Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={{ color: "#fff" }}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={{ color: "#000" }}>New User ? Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0ded7",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#9e7b00",
    borderRadius: 25,
    height: 64,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    position: "relative",
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
  inputText: {},
});

export default Login;
