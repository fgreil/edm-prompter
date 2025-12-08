// src/navigation/screens/ArticleRender/styles.js

import { StyleSheet } from "react-native";
import globals from "../../../lib/globals";
import * as colors from "../../../utils/colors";

export default StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },

  // Title and section headers
  headerTextStyle: {
    fontSize: globals.header_fontsize,
    paddingVertical: 10,
    color: colors.purple,
    fontWeight: "600",
  },

  // Teaser text above properties
  teaserStyle: {
    fontSize: 16,
    color: colors.black,
    paddingBottom: 10,
  },

  // Image wrapper with fixed height
  imageViewStyle: {
    width: "100%",
    height: 250,
    marginBottom: 10,
  },

  // Image fills wrapper
  imageStyle: {
    width: "100%",
    height: "100%",
  },

  // Markdown paragraphs
  descriptionViewStyle: {
    paddingVertical: 6,
  },

  // Property section container
  tableStyles: {
    marginVertical: 15,
  },

  // Each property line
  propertiesStyle: {
    marginVertical: 10,
  },

  // Property value text
  descriptionTextStyle: {
    fontSize: 15,
    color: colors.black,
    paddingTop: 4,
  },

  // Header icon (favorite button)
  menuIcon: {
    marginRight: 10,
  },
});
