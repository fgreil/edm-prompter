import React from "react";
import { View, ActivityIndicator, Modal } from "react-native";
import styles from "./styles";
import * as colors from "../../../utils/colors";

export default function Loader({ visible }) {
  if (!visible) return null;

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      presentationStyle="overFullScreen"
    >
      <View style={styles.viewStyle} pointerEvents="none">
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    </Modal>
  );
}
