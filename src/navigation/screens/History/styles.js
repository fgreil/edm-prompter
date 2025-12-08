// src/navigation/screens/History/styles.js

import { StyleSheet } from "react-native";
import * as colors from "../../../utils/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
    paddingHorizontal: 10,
  },

  // Card container for each date group
  cardStyle: {
    backgroundColor: colors.white,
    marginVertical: 10,
    borderRadius: 6,
    paddingBottom: 10,
    elevation: 1,
  },

  // Date title
  titleStyle: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    paddingHorizontal: 12,
  },

  // Each article row
  dataStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 10,
  },

  titleTextStyle: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
  },

  // Empty state
  blankScreenStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  largeIconStyle: {
    marginVertical: 35,
    position: "absolute",
  },
  blankScreenHeaderTextStyle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.gray,
    textAlign: "center",
  },
  detailTextStyle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: "center",
    paddingVertical: 16,
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
});
