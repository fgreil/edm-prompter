import React, { useEffect } from "react";
import { View, Image, StatusBar } from "react-native";
import styles from "./styles";
import * as colors from "../../../utils/colors";

export default function SplashScreen({ navigation }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("App");  // IMPORTANT: replace() prevents BACK navigation
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor={colors.purple} />

      <Image
        resizeMode="contain"
        source={require("../../../../../assets/splash_icon.png")}
        style={styles.imageStyle}
      />
    </View>
  );
}
