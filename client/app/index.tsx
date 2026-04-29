import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { router } from "expo-router";
import API from "../src/services/api";
import { saveToken } from "../src/utils/storage";


export default function AuthScreen() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const sendOTP = async () => {
    try {
      await API.post("/auth/send-otp", { phone });
      setStep(2);
    } catch (err) {
      console.log(err);
    }
  };

  const verifyOTP = async () => {
  const res = await API.post("/auth/verify-otp", { phone, otp });

  const token = res.data.token;

  await saveToken(token);

  router.replace("/(tabs)");
};

  return (
    <View style={{ padding: 20 }}>
      <Text>Auth</Text>

      <TextInput
        placeholder="Enter phone"
        value={phone}
        onChangeText={setPhone}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      {step === 2 && (
        <TextInput
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          style={{ borderWidth: 1, marginBottom: 10 }}
        />
      )}

      {step === 1 ? (
        <Button title="Send OTP" onPress={sendOTP} />
      ) : (
        <Button title="Verify OTP" onPress={verifyOTP} />
      )}
    </View>
  );
}