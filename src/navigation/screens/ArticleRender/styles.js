// src/navigation/screens/ArticleRender/styles.js

import { StyleSheet } from "react-native";
import * as colors from "../../../utils/colors";

export default StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 20,
    paddingBottom: 0
  },

  imageStyle: {
    width: "100%",
    height: "100%"
  },

  headerTextStyle: {
    fontSize: 20,        // previously globals.header_fontsize
    paddingBottom: 10,
    color: colors.purple
  },

  descriptionViewStyle: {
    paddingBottom: 10
  },

  propertiesStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6
  },

  tableStyles: {
    marginVertical: 10
  },

  imageViewStyle: {
    width: "100%",
    height: 250,
    marginBottom: 10
  },

  menuIcon: {
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: colors.purple
  },

  teaserStyle: {
    flex: 1,
    color: colors.black,
    fontSize: 16,
    lineHeight: 22
  },

  descriptionTextStyle: {
    fontSize: 15,
    color: colors.black
  }
});
