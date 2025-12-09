// src/navigation/screens/Splash/styles.js

import { StyleSheet } from "react-native";
import * as colors from "../../../utils/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },

  imageStyle: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },

  textStyle: {
    marginTop: 20,
    fontSize: 18,
    color: colors.purple,
    textAlign: "center",
  },
});
