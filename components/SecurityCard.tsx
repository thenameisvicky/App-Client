import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Platform,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { AdviceModal } from "@/components/Modal";

type Props = {
  message: string;
  level: "danger" | "warning" | "normal";
  advice?: string;
};

export const SecurityLogCard = ({ message, level, advice }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useColorScheme();

  const colors = {
    danger: "#FF3B30",
    warning: "#FFD60A",
    normal: theme === "dark" ? "#2C2C2E" : "#FFFFFF",
    text: theme === "dark" ? "#FFFFFF" : "#000000",
    border: theme === "dark" ? "#444" : "#DDD",
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors[level], borderColor: colors.border },
      ]}
    >
      <View style={styles.row}>
        <ThemedText style={[styles.message, { color: colors.text }]}>
          {message}
        </ThemedText>

        {advice && (
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>
        )}
      </View>

      {advice && (
        <AdviceModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          advice={advice}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 20,
    elevation: 4,
    borderWidth: Platform.OS === "android" ? 0 : 1,
    zIndex: 1,
    position: "relative",
  },
  message: {
    fontSize: 16,
    fontWeight: "500",
    flexShrink: 1,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  iconWrapper: {
    zIndex: 20,
  },
});
