import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import globalStyles from "@/src/styles/globalStyles";
import { signupUser } from "@/src/api/authApi";
 import { router } from "expo-router";


export default function SignupScreen() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

const handleSignup = async () => {
  try {
    setLoading(true);

    const response = await signupUser(form);

    Alert.alert("Success", response.message);

    router.push({
      pathname: "/(tabs)/OtpScreen",
      params: {
        userId: response.userId,
      },
    });

  } catch (error) {
    Alert.alert(
      "Error",
      error?.response?.data?.message ||
      "Signup failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.heading}>
        Create Account
      </Text>

      <TextInput
        placeholder="Name"
        style={globalStyles.input}
        value={form.name}
        onChangeText={(text) =>
          setForm({ ...form, name: text })
        }
      />

      <TextInput
        placeholder="Email"
        style={globalStyles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(text) =>
          setForm({ ...form, email: text })
        }
      />

      <TextInput
        placeholder="Phone"
        style={globalStyles.input}
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={(text) =>
          setForm({ ...form, phone: text })
        }
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={globalStyles.input}
        value={form.password}
        onChangeText={(text) =>
          setForm({ ...form, password: text })
        }
      />

      <TouchableOpacity
        style={globalStyles.button}
        onPress={handleSignup}
      >
        <Text style={globalStyles.buttonText}>
          {loading ? "Loading..." : "Signup"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace("Login")}
      >
        <Text style={globalStyles.linkText}>
          Already have an account?
        </Text>
      </TouchableOpacity>
    </View>
  );
}