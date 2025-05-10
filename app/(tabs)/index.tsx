import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Welcome to DTB-Guard 🚗
      </ThemedText>

      <ThemedText style={styles.description}>
        Manage your fleet efficiently. Add new vehicles, view activity logs, or
        track the latest updated location of your vehicles with just a few
        clicks.
      </ThemedText>

      <ThemedText style={styles.callout}>
        Get started by selecting an action:
      </ThemedText>

      <View style={styles.cardsContainer}>
        <Card
          title="Add Vehicle"
          description="Add new vehicles to your fleet"
          route="/(tabs)/registervehicle"
        />
        <Card
          title="View Logs"
          description="See all activity logs of your vehicles"
          route="/(tabs)/securitylogs"
        />
        <Card
          title="Track Vehicle"
          description="Track the last known location of your vehicles"
          route="/(tabs)/trackvehicle"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  callout: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  cardsContainer: {
    gap: 20,
    flexDirection: "column",
  },
});
