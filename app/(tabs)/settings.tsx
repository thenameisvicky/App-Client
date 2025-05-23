import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  useColorScheme,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [username, setUsername] = useState("Vignesh Star");
  const [email, setEmail] = useState("vigneshbalsubramaniyan3@gmial.com");
  const [phone, setPhone] = useState("+91 9876543210");

  const [editingField, setEditingField] = useState<null | string>(null);

  const user = {
    vehicles: 10,
  };

  const pickImage = async () => {
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
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.page}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
            <Image
              source={
                imageUri || require("@/assets/images/partial-react-logo.png")
              }
              style={styles.avatar}
            />
          </TouchableOpacity>
        }
      >
        <View style={styles.container}>
          <ThemedText type="title" style={styles.title}>
            Profile
          </ThemedText>

          <View style={styles.item}>
            <View style={styles.labelRow}>
              <ThemedText type="defaultSemiBold" style={styles.label}>
                Username
              </ThemedText>
              <TouchableOpacity onPress={() => setEditingField("username")}>
                <Ionicons name="pencil" size={16} color="#666" />
              </TouchableOpacity>
            </View>
            {editingField === "username" ? (
              <TextInput
                value={username}
                onChangeText={setUsername}
                onBlur={() => setEditingField(null)}
                style={styles.input}
              />
            ) : (
              <ThemedText style={styles.value}>{username}</ThemedText>
            )}
          </View>

          <View style={styles.item}>
            <View style={styles.labelRow}>
              <ThemedText type="defaultSemiBold" style={styles.label}>
                Email
              </ThemedText>
              <TouchableOpacity onPress={() => setEditingField("email")}>
                <Ionicons name="pencil" size={16} color="#666" />
              </TouchableOpacity>
            </View>
            {editingField === "email" ? (
              <TextInput
                value={email}
                onChangeText={setEmail}
                onBlur={() => setEditingField(null)}
                style={styles.input}
              />
            ) : (
              <ThemedText style={styles.value}>{email}</ThemedText>
            )}
          </View>

          <View style={styles.item}>
            <View style={styles.labelRow}>
              <ThemedText type="defaultSemiBold" style={styles.label}>
                Phone Number
              </ThemedText>
              <TouchableOpacity onPress={() => setEditingField("phone")}>
                <Ionicons name="pencil" size={16} color="#666" />
              </TouchableOpacity>
            </View>
            {editingField === "phone" ? (
              <TextInput
                value={phone}
                onChangeText={setPhone}
                onBlur={() => setEditingField(null)}
                style={styles.input}
              />
            ) : (
              <ThemedText style={styles.value}>{phone}</ThemedText>
            )}
          </View>

          <TouchableOpacity
            style={styles.item}
            onPress={() => router.push("/(tabs)/registervehicle")}
          >
            <View style={styles.labelRow}>
              <ThemedText type="defaultSemiBold" style={styles.label}>
                Vehicles
              </ThemedText>
              <Ionicons name="chevron-forward" size={16} color="#666" />
            </View>
            <ThemedText style={styles.value}>
              {user.vehicles} registered
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <ThemedText style={styles.logoutText}>Logout</ThemedText>
          </TouchableOpacity>
        </View>
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  container: {
    gap: 20,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 12,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 2,
  },
  input: {
    fontSize: 18,
    fontWeight: "500",
    borderBottomWidth: 1,
    borderColor: "#aaa",
    paddingVertical: 4,
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: "row",
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  avatarWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    padding: 50,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 120,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#eee",
  },
});
