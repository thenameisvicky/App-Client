import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  vehicleId: string;
  location: string;
  status: string;
};

export const VehicleTrackCard = ({ vehicleId, location, status }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.id}>{vehicleId}</Text>
      <Text style={styles.location}>{location}</Text>
      <Text style={styles.status}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    minWidth: 160,
    maxWidth: 200,
  },
  id: { fontWeight: "bold", fontSize: 16 },
  location: { marginTop: 8, fontSize: 14, color: "#444" },
  status: { marginTop: 6, fontSize: 13, color: "#007AFF" },
});
