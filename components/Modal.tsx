import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  onClose: () => void;
  advice: string;
};

export const AdviceModal = ({ visible, onClose, advice }: Props) => {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
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
              Advice
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons
                name="close"
                size={24}
                color={isDark ? "#FFF" : "#000"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <Text style={{ color: isDark ? "#EEE" : "#333", fontSize: 16 }}>
              {advice}
            </Text>
          </View>
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
    minHeight: height * 0.15,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  body: {
    flex: 1,
  },
});
