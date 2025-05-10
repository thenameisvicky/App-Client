import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ExternalPathString, RelativePathString, useRouter } from "expo-router";

type CardProps = {
  title: string;
  description: string;
  route: string;
};

export const Card: React.FC<CardProps> = ({ title, description, route }) => {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor:
            colorScheme === "dark" ? "rgba(255, 255, 255, 0.1)" : "#fff",
        },
      ]}
      onPress={() =>
        router.push(route as ExternalPathString | RelativePathString)
      }
    >
      <View style={styles.cardContent}>
        <ThemedText
          type="title"
          style={[
            styles.cardTitle,
            { color: colorScheme === "dark" ? "#ffff" : "#333" },
          ]}
        >
          {title}
        </ThemedText>
        <ThemedText
          style={[
            styles.cardDescription,
            { color: colorScheme === "dark" ? "#bbb" : "#777" },
          ]}
        >
          {description}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 20,
    padding: 20,
    width: "100%",
  },
  cardContent: {
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    textAlign: "center",
  },
});
