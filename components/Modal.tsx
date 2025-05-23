import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Vehicle = {
  email: string;
  vin: string;
  make: string;
  model: string;
  date: string;
  location: string;
  speed: number;
  status: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (vehicle: Vehicle) => void;
  advice: string;
  isVehicleAdd?: boolean;
};

export const AdviceModal = ({
  visible,
  onClose,
  onSave,
  advice,
  isVehicleAdd,
}: Props) => {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [vin, setVin] = useState("");
  const [location, setLocation] = useState("");

  const handleSave = () => {
    const newVehicle: Vehicle = {
      email: "",
      vin,
      make,
      model,
      location,
      speed: 0,
      status: "parked",
      date: new Date().toISOString().split("T")[0],
    };
    onSave(newVehicle);
    onClose();
    setMake("");
    setModel("");
    setVin("");
    setLocation("");
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: isDark ? "#1C1C1E" : "#FFF",
              borderColor: isDark ? "#333" : "#CCC",
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: isDark ? "#FFF" : "#000" }]}>
              {isVehicleAdd ? "Add New Vehicle" : "Advice"}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={isDark ? "#FFF" : "#000"} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {isVehicleAdd ? (
              <>
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: isDark ? "#BBB" : "#555" }]}>VIN</Text>
                  <TextInput
                    placeholder="Enter VIN"
                    value={vin}
                    onChangeText={setVin}
                    style={[
                      styles.input,
                      { backgroundColor: isDark ? "#2C2C2E" : "#F2F2F7", color: isDark ? "#FFF" : "#000" },
                    ]}
                    placeholderTextColor={isDark ? "#888" : "#999"}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: isDark ? "#BBB" : "#555" }]}>Make</Text>
                  <TextInput
                    placeholder="Enter Make"
                    value={make}
                    onChangeText={setMake}
                    style={[
                      styles.input,
                      { backgroundColor: isDark ? "#2C2C2E" : "#F2F2F7", color: isDark ? "#FFF" : "#000" },
                    ]}
                    placeholderTextColor={isDark ? "#888" : "#999"}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: isDark ? "#BBB" : "#555" }]}>Model</Text>
                  <TextInput
                    placeholder="Enter Model"
                    value={model}
                    onChangeText={setModel}
                    style={[
                      styles.input,
                      { backgroundColor: isDark ? "#2C2C2E" : "#F2F2F7", color: isDark ? "#FFF" : "#000" },
                    ]}
                    placeholderTextColor={isDark ? "#888" : "#999"}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: isDark ? "#BBB" : "#555" }]}>Location</Text>
                  <TextInput
                    placeholder="Enter Location"
                    value={location}
                    onChangeText={setLocation}
                    style={[
                      styles.input,
                      { backgroundColor: isDark ? "#2C2C2E" : "#F2F2F7", color: isDark ? "#FFF" : "#000" },
                    ]}
                    placeholderTextColor={isDark ? "#888" : "#999"}
                  />
                </View>
              </>
            ) : (
              <Text style={{ color: isDark ? "#EEE" : "#333", fontSize: 16 }}>{advice}</Text>
            )}
          </ScrollView>
          {isVehicleAdd && (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 16 }}>Save Vehicle</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 20,
  },
  modalContainer: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    minHeight: height * 0.5,
    maxHeight: height * 0.8,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  body: {
    flexGrow: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
