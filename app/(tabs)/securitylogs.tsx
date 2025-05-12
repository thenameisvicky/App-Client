import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { SecurityLogCard } from "@/components/SecurityCard";

export default function SecurityLogsScreen() {
  const [logs, setLogs] = useState([
    {
      id: "1",
      message: "Unauthorized login attempt from IP 192.168.0.23",
      level: "danger",
      advice:
        "Immediately reset your password and enable two-factor authentication (2FA).",
    },
    {
      id: "2",
      message: "Password changed successfully",
      level: "normal",
      advice: "No action needed. This is a routine update.",
    },
    {
      id: "3",
      message: "Multiple failed login attempts",
      level: "warning",
      advice:
        "Review login history and consider changing your password if activity is suspicious.",
    },
    {
      id: "4",
      message: "Device added to trusted list",
      level: "normal",
      advice: "Verify the device is yours. Remove it if unfamiliar.",
    },
    {
      id: "5",
      message: "New location login from Berlin, Germany",
      level: "warning",
      advice:
        "Confirm if this was you. Otherwise, reset your password immediately.",
    },
    {
      id: "6",
      message: "Suspicious browser activity detected",
      level: "danger",
      advice: "Terminate all active sessions and reset your password.",
    },
    {
      id: "7",
      message: "Login from unknown device",
      level: "warning",
      advice:
        "Check if this was authorized. Enable login alerts for future events.",
    },
    {
      id: "8",
      message: "Email address changed successfully",
      level: "normal",
      advice: "No action required if you initiated the change.",
    },
    {
      id: "9",
      message: "Security questions updated",
      level: "warning",
      advice:
        "Ensure only you know the answers. Contact support if unauthorized.",
    },
    {
      id: "10",
      message: "Admin privileges granted to another user",
      level: "danger",
      advice:
        "Review account roles immediately. Revoke access if not intentional.",
    },
    {
      id: "11",
      message: "Unusual API access pattern detected",
      level: "danger",
      advice:
        "Disable affected API keys and regenerate them. Investigate usage logs.",
    },
    {
      id: "12",
      message: "Biometric login enabled",
      level: "normal",
      advice: "No action needed unless you didn’t enable this.",
    },
  ]);

  return (
    <View style={styles.page}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#F5F5F5", dark: "#1D1D1D" }}
        headerImage={
          <Image
            source={require("@/assets/images/partial-react-logo.png")}
            style={styles.reactLogo}
          />
        }
      >
        <View style={styles.container}>
          <ThemedText type="title" style={styles.title}>
            Security Logs
          </ThemedText>

          <View style={styles.cardsContainer}>
            {logs.map((log) => (
              <SecurityLogCard
                key={log.id}
                message={log.message}
                level={log.level as "danger" | "warning" | "normal"}
                advice={log.advice}
              />
            ))}
          </View>
        </View>
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  container: {
    flexGrow: 1,
    paddingTop: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  cardsContainer: {
    gap: 12,
    marginBottom: 32,
    width: 450,
    alignSelf: "center",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
