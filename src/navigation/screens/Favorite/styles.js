// src/navigation/screens/Favorite/styles.js
import { StyleSheet } from "react-native";
import * as colors from "../../../utils/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
    paddingTop: 10,
  },

  // Each favorite card container
  containerListStyle: {
    backgroundColor: colors.white,
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 1,
    overflow: "hidden",
  },

  // Article title inside the card
  titleListStyle: {
    paddingVertical: 20,
    paddingHorizontal: 22,
    fontSize: 16,
    color: colors.black,
  },

  // Swipeout right-side "Remove" panel
  removeStyle: {
    flex: 1,
    backgroundColor: colors.purple,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  removeTextStyle: {
    color: colors.white,
    fontSize: 14,
    marginTop: 6,
  },

  // -----------------------------------------
  // Blank / empty state styles
  // -----------------------------------------

  blankScreenStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  iconContainerStyle: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },

  blankScreenHeaderTextStyle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.gray,
    textAlign: "center",
    marginBottom: 10,
  },

  detailTextStyle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: "center",
    marginVertical: 4,
  },
});
