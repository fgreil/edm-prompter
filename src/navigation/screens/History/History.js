import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import styles from "./styles";
import * as colors from "../../../utils/colors";

// SQLite helper
import { getHistory } from "../../../database/services/history";

export default function History({ navigation }) {
  const [groupedHistory, setGroupedHistory] = useState([]);

  // ---------------------------------------------------------
  // Load history from DB
  // ---------------------------------------------------------
  async function loadHistory() {
    const raw = await getHistory();
    const grouped = groupByDate(raw);
    setGroupedHistory(grouped.reverse()); // newest first
  }

  // Load once on mount
  useEffect(() => {
    loadHistory();
  }, []);

  // Also reload when screen becomes active
  useFocusEffect(
    React.useCallback(() => {
      loadHistory();
    }, [])
  );

  // ---------------------------------------------------------
  // Group articles by "date"
  // ---------------------------------------------------------
  function groupByDate(data) {
    if (!data || data.length === 0) return [];

    const map = {};

    data.forEach(a => {
      if (!map[a.date]) map[a.date] = [];
      map[a.date].push(a);
    });

    return Object.keys(map).map(date => ({
      title: date,
      data: map[date]
    }));
  }

  // ---------------------------------------------------------
  // EMPTY STATE
  // ---------------------------------------------------------
  if (!groupedHistory.length) {
    return (
      <View style={styles.blankScreenStyle}>
        <View style={styles.iconContainerStyle}>
          <MaterialIcons
            name="history"
            size={50}
            style={styles.largeIconStyle}
            color={colors.gray}
          />
        </View>

        <Text style={styles.blankScreenHeaderTextStyle}>
          No History to show
        </Text>

        <Text style={styles.detailTextStyle}>
          Track articles you’ve viewed. They’re available offline.
        </Text>
      </View>
    );
  }

  // ---------------------------------------------------------
  // MAIN RENDER
  // ---------------------------------------------------------
  return (
    <View style={styles.container}>
      <FlatList
        data={groupedHistory}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({ item }) => (
          <View style={styles.cardStyle}>
            <Text style={styles.titleStyle}>{item.title}</Text>

            {item.data.map(article => (
              <TouchableOpacity
                key={article.title}
                activeOpacity={0.6}
                onPress={() =>
                  navigation.navigate("HistoryArticle", {
                    param: article,
                    headerTitle: article.title,
                    icon_color: article.icon_color,
                    tab: "history"
                  })
                }
              >
                <View style={styles.dataStyle}>
                  <Image
                    resizeMode="contain"
                    style={styles.imageStyle}
                    source={
                      article.image
                        ? { uri: article.image }
                        : require("../../../../../assets/splash_icon.png")
                    }
                  />
                  <Text style={styles.titleTextStyle}>{article.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
}
