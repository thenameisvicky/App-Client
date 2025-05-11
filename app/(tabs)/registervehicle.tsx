import { ThemedText } from "@/components/ThemedText";
import { VehicleCard } from "@/components/VehicleCard";
import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Tooltip from "react-native-walkthrough-tooltip";

export default function RegisterVehicleScreen() {
  const [vehicles, setVehicles] = useState([
    {
      id: "1",
      name: "Tesla Model 3",
      location: "San Jose",
      distance: "2.1 km",
    },
    {
      id: "2",
      name: "Chevrolet Bolt",
      location: "Oakland",
      distance: "4.8 km",
    },
    {
      id: "3",
      name: "Nissan Leaf",
      location: "Sacramento",
      distance: "10.2 km",
    },
    { id: "4", name: "BMW i3", location: "Los Angeles", distance: "7.3 km" },
    { id: "5", name: "Rivian R1T", location: "Fremont", distance: "12.6 km" },
    { id: "6", name: "Lucid Air", location: "Palo Alto", distance: "3.7 km" },
    {
      id: "7",
      name: "Ford F-150 Lightning",
      location: "Sunnyvale",
      distance: "6.9 km",
    },
    {
      id: "8",
      name: "Hyundai Ioniq 5",
      location: "Berkeley",
      distance: "5.2 km",
    },
  ]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    const confirmed = await new Promise((resolve) =>
      Alert.alert("Delete Vehicles", "Are you sure?", [
        { text: "Cancel", style: "cancel", onPress: () => resolve(false) },
        { text: "Delete", style: "destructive", onPress: () => resolve(true) },
      ])
    );
    if (!confirmed) return;

    try {
      for (const id of selectedIds) {
        await fetch(`http://your-api.com/api/vehicles/${id}`, {
          method: "DELETE",
        });
      }
      setVehicles((prev) => prev.filter((v) => !selectedIds.includes(v.id)));
      setSelectedIds([]);
    } catch (err) {
      Alert.alert("Error", "Failed to delete vehicles.");
    }
  };

  const selectAll = () => {
    if (selectedIds.length === vehicles.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(vehicles.map((v) => v.id));
    }
  };

  return (
    <View style={styles.page}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/partial-react-logo.png")}
            style={styles.reactLogo}
          />
        }
      >
        <View style={styles.container}>
          <ThemedText type="title" style={styles.title}>
            Your Fleet
          </ThemedText>

          <View style={styles.cardsContainer}>
            {vehicles.map((v) => (
              <VehicleCard
                key={v.id}
                name={v.name}
                location={v.location}
                distance={v.distance}
                selected={selectedIds.includes(v.id)}
                onSelect={() => toggleSelection(v.id)}
              />
            ))}
          </View>
        </View>
      </ParallaxScrollView>
      <TouchableOpacity style={styles.fab} onPress={() => {}}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
      <Tooltip
        isVisible={tooltipVisible}
        content={<ThemedText>Select All Vehicles</ThemedText>}
        placement="top"
        onClose={() => setTooltipVisible(false)}
        useInteractionManager
      >
        <TouchableOpacity
          style={styles.selectAllButton}
          onPress={() => {
            selectAll();
            setTooltipVisible(false);
          }}
          onLongPress={() => {
            console.log("Long press detected");
            setTooltipVisible(true);
          }}
          delayLongPress={300}
        >
          <Ionicons
            name={
              selectedIds.length === vehicles.length
                ? "checkbox-outline"
                : "square-outline"
            }
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </Tooltip>
      {selectedIds.length > 0 && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  container: { flexGrow: 1, justifyContent: "center" },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  cardsContainer: { gap: 20 },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#007AFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    zIndex: 999,
  },
  deleteButton: {
    position: "absolute",
    bottom: 24,
    left: 24,
    backgroundColor: "#FF3B30",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    zIndex: 999,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  selectAllButton: {
    position: "absolute",
    bottom: 100,
    left: 24,
    backgroundColor: "#5AC8FA",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    zIndex: 999,
  },
});
