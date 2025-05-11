import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type VehicleCardProps = {
  name: string;
  location: string;
  distance: string;
  selected: boolean;
  onSelect: () => void;
};

export function VehicleCard({
  name,
  location,
  distance,
  selected,
  onSelect,
}: VehicleCardProps) {
  return (
    <Pressable onPress={onSelect} style={styles.card}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>📍 {location}</Text>
        <Text style={styles.distance}>{distance} away</Text>
      </View>
      <Ionicons
        name={selected ? "checkbox" : "square-outline"}
        size={24}
        color={selected ? "#007AFF" : "#999"}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  imagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: "#ccc",
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  distance: {
    fontSize: 14,
    color: "#777",
  },
});
