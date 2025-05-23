import { ThemedText } from "@/components/ThemedText";
import { VehicleCard } from "@/components/VehicleCard";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Tooltip from "react-native-walkthrough-tooltip";
import { AdviceModal } from "@/components/Modal";
import * as ImagePicker from "expo-image-picker";

export default function RegisterVehicleScreen() {
  const [vehicles, setVehicles] = useState([
    {
      email: "user1@example.com",
      vin: "TN01AB1234VIN",
      make: "Maruti",
      model: "Alto",
      date: "2023-10-01",
      location: "Guindy, Chennai",
      speed: 0,
      status: "parked",
    },
    {
      email: "user2@example.com",
      vin: "TN09CD5678VIN",
      make: "Hyundai",
      model: "i20",
      date: "2023-10-01",
      location: "Velachery, Chennai",
      speed: 45,
      status: "moving",
    },
    {
      email: "user3@example.com",
      vin: "TN10EF9012VIN",
      make: "Tata",
      model: "Nexon",
      date: "2023-10-01",
      location: "Coimbatore",
      speed: 0,
      status: "idle",
    },
    {
      email: "user4@example.com",
      vin: "TN12GH3456VIN",
      make: "Mahindra",
      model: "XUV700",
      date: "2023-10-01",
      location: "Madurai",
      speed: 0,
      status: "parked",
    },
    {
      email: "user5@example.com",
      vin: "TN14IJ7890VIN",
      make: "Kia",
      model: "Seltos",
      date: "2023-10-01",
      location: "Tiruchirapalli",
      speed: 65,
      status: "moving",
    },
    {
      email: "user6@example.com",
      vin: "TN16KL2345VIN",
      make: "Honda",
      model: "City",
      location: "Salem",
      speed: 0,
      status: "idle",
    },
    {
      email: "user7@example.com",
      vin: "TN18MN6789VIN",
      make: "Toyota",
      model: "Innova",
      date: "2023-10-01",
      location: "Erode",
      speed: 50,
      status: "moving",
    },
    {
      email: "user8@example.com",
      vin: "TN20OP1234VIN",
      make: "Ford",
      model: "EcoSport",
      date: "2023-10-01",
      location: "Vellore",
      speed: 0,
      status: "parked",
    },
    {
      email: "user9@example.com",
      vin: "TN22QR5678VIN",
      make: "Renault",
      model: "Kwid",
      date: "2023-10-01",
      location: "Nagercoil",
      speed: 0,
      status: "idle",
    },
    {
      email: "user10@example.com",
      vin: "TN24ST9012VIN",
      make: "MG",
      model: "Astor",
      date: "2023-10-01",
      location: "Thanjavur",
      speed: 70,
      status: "moving",
    },
  ]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [headerImageUri, setHeaderImageUri] = useState<string | null>(null);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSaveVehicle = async (vehicle: (typeof vehicles)[number]) => {
    const route = "/api/vehicles/add";
    const response = await fetch(`http://192.168.1.154:3000${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vehicle }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data?.message || "Something went wrong");
    }

    setVehicles((prev) => [...prev, vehicle]);
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
        await fetch(`http://your-api.com/api/vehicles/delete`, {
          method: "DELETE",
          body: id,
        });
      }
      setVehicles((prev) => prev.filter((v) => !selectedIds.includes(v.vin)));
      setSelectedIds([]);
    } catch (err) {
      Alert.alert("Error", "Failed to delete vehicles.");
    }
  };

  const selectAll = () => {
    if (selectedIds.length === vehicles.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(vehicles.map((v) => v.vin));
    }
  };

  const pickHeaderImage = async () => {
    const permissionResult =
      Platform.OS !== "web"
        ? await ImagePicker.requestMediaLibraryPermissionsAsync()
        : { granted: true };

    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 2],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setHeaderImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.page}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <TouchableOpacity
            onPress={pickHeaderImage}
            style={styles.headerImageWrapper}
          >
            {headerImageUri ? (
              <Image
                source={{ uri: headerImageUri as string }}
                style={styles.reactLogo}
                contentFit="cover"
              />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Ionicons name="cloud-upload-outline" size={48} color="#ccc" />
                <ThemedText
                  type="default"
                  style={{ color: "#888", marginTop: 8 }}
                >
                  Upload Cover
                </ThemedText>
              </View>
            )}
          </TouchableOpacity>
        }
      >
        <View style={styles.container}>
          <ThemedText type="title" style={styles.title}>
            Your Fleet
          </ThemedText>

          <View style={styles.cardsContainer}>
            {vehicles.map((v) => (
              <VehicleCard
                key={v.vin}
                number={v.vin}
                name={v.make + " " + v.model}
                dateAdded={v.date}
                selected={selectedIds.includes(v.vin)}
                onSelect={() => toggleSelection(v.vin)}
              />
            ))}
          </View>
          {isModalOpen && (
            <AdviceModal
              visible={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
              }}
              onSave={handleSaveVehicle}
              isVehicleAdd={true}
              advice="test modal"
            />
          )}
        </View>
      </ParallaxScrollView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setIsModalOpen(true);
        }}
      >
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
  cardsContainer: { gap: 20, alignSelf: "center" },
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
  headerImageWrapper: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  reactLogo: {
    width: "100%",
    height: 250,
  },
  uploadPlaceholder: {
    width: "100%",
    height: 210,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
  },
});
