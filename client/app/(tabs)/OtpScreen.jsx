import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import globalStyles from "@/src/styles/globalStyles";
import { verifyOtp } from "@/src/api/authApi";

export default function OtpScreen() {
  const { userId } = useLocalSearchParams();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {
    try {
      if (!otp.trim()) {
        return Alert.alert(
          "Error",
          "Please enter OTP"
        );
      }

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
        response.message
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
        Verify OTP
      </Text>

      <Text
        style={{
          marginBottom: 20,
          color: "#666",
        }}
      >
        Enter the OTP sent to your email
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
        <Text style={globalStyles.buttonText}>
          {loading
            ? "Verifying..."
            : "Verify OTP"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.back()
        }
      >
        <Text style={globalStyles.linkText}>
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}