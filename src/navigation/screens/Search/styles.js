// src/navigation/screens/Search/styles.js

import { StyleSheet } from "react-native";
import * as colors from "../../../utils/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
  },

  // --------------------------
  // HEADER
  // --------------------------
  headerStyles: {
    flexDirection: "row",
    backgroundColor: colors.purple,
    alignItems: "flex-end",
    paddingBottom: 6,
    paddingHorizontal: 10,
  },
  menuIcon: {
    marginHorizontal: 10,
    marginBottom: 2,
  },
  textInputViewStyle: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    marginBottom: 5,
    paddingLeft: 5,
  },
  headerTextInputStyle: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
    paddingBottom: 5,
  },

  // --------------------------
  // RESULT CARDS
  // --------------------------
  cardStyle: {
    marginHorizontal: 20,
    marginVertical: 15,
    backgroundColor: colors.white,
    paddingVertical: 15,
    borderRadius: 4,
    elevation: 1,
  },
  cardHeaderStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardHeaderImageStyle: {
    height: 50,
    width: 50,
    marginHorizontal: 10,
    borderRadius: 4,
  },
  headerTitleStyle: {
    fontSize: 16,
    flex: 1,
  },
  cardTeaserViewStyle: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  cardTeaserTextStyle: {
    fontSize: 15,
    color: colors.black,
  },

  // --------------------------
  // EMPTY STATE
  // --------------------------
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
  },
  detailTextStyle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: "center",
    marginTop: 16,
  },

  // --------------------------
  // HISTORY
  // --------------------------
  searchTopTextStyle: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
  },
  listTextStyle: {
    fontSize: 15,
    color: colors.black,
    flexShrink: 1,
  },
});
