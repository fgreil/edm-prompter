import { StyleSheet } from "react-native";
import * as colors from "../../utils/colors";

export default StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    // A semi-transparent overlay so the loader is visible
    backgroundColor: "rgba(0,0,0,0.35)"
  },

  loaderStyle: {
    // Optional: loader sits slightly above center like your old version
    marginBottom: "30%"
  }
});
