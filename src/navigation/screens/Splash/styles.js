export default styles;

import { StyleSheet } from "react-native";
import * as colors from "../../../utils/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center"
  },
  imageStyle: {
    width: 230,
    height: 230,
  }
});

