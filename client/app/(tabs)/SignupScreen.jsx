import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import globalStyles from "@/src/styles/globalStyles";
import {
  signupUser,
  verifyOtp,
} from "@/src/api/authApi";

export default function SignupScreen() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);

      const response = await signupUser(form);

      Alert.alert(
        "Success",
        "Account created. Enter OTP."
      );

      setUserId(response.userId);
      setShowOtp(true);

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

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);

      const response = await verifyOtp({
        userId,
        otp,
      });

      await AsyncStorage.setItem(
        "token",
        response.token
      );

      Alert.alert(
        "Success",
        "OTP verified"
      );

      router.replace("/(tabs)");

    } catch (error) {
      Alert.alert(
        "Error",
        error?.response?.data?.message ||
          "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.heading}>
        {showOtp
          ? "Verify OTP"
          : "Create Account"}
      </Text>

      {!showOtp ? (
        <>
          <TextInput
            placeholder="Name"
            style={globalStyles.input}
            value={form.name}
            onChangeText={(text) =>
              setForm({
                ...form,
                name: text,
              })
            }
          />

          <TextInput
            placeholder="Email"
            style={globalStyles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(text) =>
              setForm({
                ...form,
                email: text,
              })
            }
          />

          <TextInput
            placeholder="Phone"
            style={globalStyles.input}
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(text) =>
              setForm({
                ...form,
                phone: text,
              })
            }
          />

          <TextInput
            placeholder="Password"
            secureTextEntry
            style={globalStyles.input}
            value={form.password}
            onChangeText={(text) =>
              setForm({
                ...form,
                password: text,
              })
            }
          />

          <TouchableOpacity
            style={globalStyles.button}
            onPress={handleSignup}
          >
            <Text
              style={
                globalStyles.buttonText
              }
            >
              {loading
                ? "Loading..."
                : "Signup"}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text
            style={{
              marginBottom: 15,
            }}
          >
            Enter OTP sent to email
          </Text>

          <TextInput
            placeholder="Enter OTP"
            keyboardType="number-pad"
            maxLength={6}
            style={globalStyles.input}
            value={otp}
            onChangeText={setOtp}
          />

          <TouchableOpacity
            style={globalStyles.button}
            onPress={handleVerifyOtp}
          >
            <Text
              style={
                globalStyles.buttonText
              }
            >
              {loading
                ? "Verifying..."
                : "Verify OTP"}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {!showOtp && (
        <TouchableOpacity
          onPress={() =>
            router.replace(
              "/(auth)/LoginScreen"
            )
          }
        >
          <Text
            style={globalStyles.linkText}
          >
            Already have an account?
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}