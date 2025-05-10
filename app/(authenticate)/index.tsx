import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Button,
  Alert,
  useColorScheme,
} from "react-native";
import { Image } from "expo-image";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";

export default function LoginSignup() {
  const { login } = useAuth();
  const colorScheme = useColorScheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    try {
      setLoading(true);
      const route = isLogin ? "/api/auth/login" : "/api/auth/signup";

      const response = await fetch(`http://192.168.188.110:3000${route}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.message || "Something went wrong");
      }

      await login();
      router.replace("/(tabs)"); 
    } catch (err: any) {
      Alert.alert("Error", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const placeholderTextColor = colorScheme === "dark" ? "#ccc" : "#888";

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={{ textAlign: "center" }}>
          {isLogin ? "LOGIN" : "SIGN UP"}
        </ThemedText>

        <TextInput
          placeholder="Email"
          placeholderTextColor={placeholderTextColor}
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={placeholderTextColor}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <Button
          title={loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          onPress={handleAuth}
        />
        <ThemedText
          style={styles.switchText}
          onPress={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 12,
    borderRadius: 10,
    color: "#fff", 
  },
  switchText: {
    textAlign: "center",
    marginTop: 12,
    color: "#007bff",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
