import { StyleSheet } from "react-native";
import * as colors from "../../../utils/colors";

export default StyleSheet.create({
  // Container (not always needed, but kept for flexibility)
  container: {
    flex: 1,
    backgroundColor: colors.grey,
  },

  // "Previously searched" header
  searchTopTextStyle: {
    fontSize: 16,
    fontWeight: "200",
    paddingLeft: 16,
    paddingVertical: 15,
    color: colors.black,
  },

  // Each row in the list
  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    backgroundColor: colors.white,
  },

  listTextStyle: {
    fontSize: 15,
    fontWeight: "300",
    color: colors.black,
  },

  // Empty history screen
  blankScreenStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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
  },

  detailTextStyle: {
    fontSize: 16,
    fontWeight: "100",
    color: colors.gray,
    paddingVertical: 16,
    textAlign: "center",
  },

  largeIconStyle: {
    marginVertical: 35,
    position: "absolute",
  },
});
