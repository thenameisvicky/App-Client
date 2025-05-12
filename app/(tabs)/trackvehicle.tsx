import React from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { VehicleTrackCard } from "@/components/VehicleTrackCard";

export default function TrackingScreen() {
  const vehicles = [
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
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Vehicles</Text>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.vin}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <VehicleTrackCard
            vehicleId={item.vin}
            location={item.location}
            status={item.status}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2", marginTop: 50 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 100,
    marginBottom: 10,
  },
});
