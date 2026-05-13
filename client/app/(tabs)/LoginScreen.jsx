import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  globalStylesheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "@/src/api/authApi";
import globalStyles from "@/src/styles/globalStyles";


export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  try {
    setLoading(true);

    const response = await loginUser({
      email,
      password,
    });

    await AsyncStorage.setItem(
      "token",
      response.token
    );

    Alert.alert("Success", response.message);

    router.replace("/(tabs)");

  } catch (error) {
    Alert.alert(
      "Error",
      error?.response?.data?.message ||
        "Login failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.heading}>
        Welcome Back
      </Text>

      <TextInput
        placeholder="Email"
        style={globalStyles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={globalStyles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={globalStyles.button}
        onPress={handleLogin}
      >
        <Text style={globalStyles.btnText}>
          {loading ? "Loading..." : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Signup")
        }
      >
        <Text>Create new account</Text>
      </TouchableOpacity>
    </View>
  );
}
