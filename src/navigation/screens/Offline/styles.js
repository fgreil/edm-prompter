import { StyleSheet } from "react-native";
import * as colors from "../../../utils/colors";

export default StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.grey,
    paddingHorizontal: 20
  },

  offline_imageStyle: {
    width: "80%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 20
  },

  offline_textStyle: {
    fontSize: 16,
    color: colors.black,
    textAlign: "center",
    marginBottom: 20
  },

  refreshViewStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.purple,
    borderRadius: 6,
    marginTop: 10
  },

  refresh: {
    color: colors.white,
    fontSize: 16,
    marginRight: 10
  }
});
