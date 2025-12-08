// src/navigation/screens/Explore/styles.js
import { StyleSheet } from "react-native";
import * as colors from "../../../utils/colors";

export default StyleSheet.create({
  // Full screen
  container: {
    flex: 1,
    backgroundColor: colors.grey,
  },

  // Main carousel slide
  mainCarouselStyle: {
    flex: 1,
    backgroundColor: colors.grey,
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 65,
  },

  // Article title
  titleStyle: {
    flex: 1,
    color: colors.black,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 6,
  },

  // Teaser text
  teaserStyle: {
    marginHorizontal: 20,
    marginTop: 10,
    color: colors.black,
    fontSize: 15,
  },

  // Wrapper for the heart icon
  icon_image_view_style: {
    position: "absolute",
    top: 20,
    right: 20,
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
  },

  // Article image
  imageStyle: {
    width: "100%",
    height: 220,
    alignSelf: "center",
    marginTop: 10,
  },

  // Touchable card (whole page content)
  touchableStyle: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 6,
    paddingBottom: 20,
  },

  // Header row with title + favorite button
  titleViewStyle: {
    marginHorizontal: 8,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Refresh icon container (autorenew button)
  absoluteIconStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: colors.purple,
    borderWidth: 2,
    backgroundColor: colors.white,
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  // Offline screen
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  offline_imageStyle: {
    width: "90%",
    height: 250,
  },

  offline_textStyle: {
    fontSize: 16,
    color: colors.black,
    textAlign: "center",
    marginVertical: 20,
  },

  refreshViewStyle: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 4,
    backgroundColor: colors.purple,
    alignSelf: "center",
  },
});
