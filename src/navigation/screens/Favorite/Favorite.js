import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";

import Swipeout from "react-native-swipeout";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./styles";
import * as colors from "../../../utils/colors";

// SQLite services
import {
  getFavorites,
  removeFavorite
} from "../../../database/services/favorites";

export default function Favorite({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  // ---------------------------------------------------------
  // Load favorites from DB
  // ---------------------------------------------------------
  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (e) {
      console.warn("Failed to load favorites", e);
    }
  }

  // ---------------------------------------------------------
  // Remove article
  // ---------------------------------------------------------
  function confirmRemove(article) {
    Alert.alert(
      "Remove favorite?",
      "This article will be removed from your favorites.",
      [
        {
          text: "OK",
          onPress: async () => {
            await removeFavorite(article.title);
            await loadFavorites();
          }
        },
        { text: "Cancel", style: "cancel" }
      ]
    );
  }

  // ---------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------
  return (
    <View style={styles.container}>
      <StatusBar translucent={false} barStyle="light-content" />

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <Swipeout
              autoClose
              right={[
                {
                  component: (
                    <View style={styles.removeStyle}>
                      <MaterialIcons name="delete" size={27} color={colors.white} />
                      <Text style={styles.removeTextStyle}>Remove</Text>
                    </View>
                  ),
                  backgroundColor: colors.white,
                  onPress: () => confirmRemove(item)
                }
              ]}
              style={styles.containerListStyle}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("FavoriteArticle", {
                    param: item,
                    headerTitle: item.title,
                    icon_color: colors.red,
                    tab: "favorite"
                  })
                }
              >
                <Text style={styles.titleListStyle}>{item.title}</Text>
              </TouchableOpacity>
            </Swipeout>
          )}
        />
      ) : (
        // EMPTY SCREEN
        <View style={styles.blankScreenStyle}>
          <View style={styles.iconContainerStyle}>
            <MaterialIcons
              name="favorite"
              size={50}
              style={styles.largeIconStyle}
              color={colors.gray}
            />
          </View>

          <Text style={styles.blankScreenHeaderTextStyle}>
            No favorite articles yet
          </Text>

          <Text style={styles.detailTextStyle}>
            Your saved articles will appear here.
          </Text>

          <Text
            style={[
              styles.detailTextStyle,
              { paddingVertical: 0, bottom: 5 }
            ]}
          >
            Tap the heart icon inside an article to add it to your favorites.
            Favorites are available offline.
          </Text>
        </View>
      )}
    </View>
  );
}
