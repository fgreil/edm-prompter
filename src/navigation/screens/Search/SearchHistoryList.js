// src/navigation/screens/Search/SearchHistoryList.js

import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as colors from "../../../utils/colors";
import styles from "./styles";

export default function SearchHistoryList({ data, onPress }) {
  const hasHistory = Array.isArray(data) && data.length > 0;

  if (!hasHistory) {
    return (
      <View style={styles.blankScreenStyle}>
        <View style={styles.iconContainerStyle}>
          <MaterialIcons name="search" size={50} color={colors.gray} />
        </View>

        <Text style={styles.blankScreenHeaderTextStyle}>
          You have not used the search yet.
        </Text>

        <Text style={styles.detailTextStyle}>
          Enter a keyword to start searching.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.searchTopTextStyle}>Previously Searched</Text>

      {data.map((entry, index) => {
        // Our SQLite schema: entry = {keyword, filters}
        const keyword = typeof entry === "string" ? entry : entry.keyword;

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => onPress(keyword)}
            style={styles.historyRow}
          >
            <Text style={styles.listTextStyle}>{keyword}</Text>
            <MaterialIcons name="history" size={24} color={colors.gray} />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
