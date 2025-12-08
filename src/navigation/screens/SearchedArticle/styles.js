import { StyleSheet } from "react-native";
import * as colors from "../../../utils/colors";

export default StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.grey,
    paddingHorizontal: 20,
    paddingBottom: 0
  },

  headerTextStyle: {
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 10,
    color: colors.purple
  },

  imageViewStyle: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },

  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 8
  },

  teaserStyle: {
    fontSize: 16,
    color: colors.black,
    lineHeight: 22
  }
});
