import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StatusBar, 
  TouchableOpacity, 
  Image 
} from "react-native";

import { IndicatorViewPager, PagerDotIndicator } from "rn-viewpager";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";

import styles from "./styles";
import * as colors from "../../../utils/colors";
import Offline from "../Offline/Offline";
import Loader from "../Loader/Loader";
import callApi from "../../../lib/apicaller";

// SQLite services
import { 
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite
} from "../../../database/services/favorites";

import {
  addToHistory
} from "../../../database/services/history";

export default function Explore({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  // -------------------------------
  // Connectivity
  // -------------------------------
  useEffect(() => {
    NetInfo.fetch().then(state => {
      const online = !!state.isConnected;
      setIsConnected(online);
      if (online) loadArticles();
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      const online = !!state.isConnected;
      setIsConnected(online);
      if (online && articles.length === 0) loadArticles();
    });

    return () => unsubscribe();
  }, []);

  // -------------------------------
  // Load Random Articles
  // -------------------------------
  async function loadArticles() {
    setLoading(true);
    try {
      const response = await callApi("article/random/3", "GET");

      // Mark favorites
      const favs = await getFavorites();

      const enriched = response.map(item => ({
        ...item,
        icon_color: favs.some(f => f.title === item.title)
          ? colors.red
          : colors.white
      }));

      setArticles(enriched);
    } catch (err) {
      alert(err);
    }
    setLoading(false);
  }

  async function refreshArticle() {
    await loadArticles();
  }

  // -------------------------------
  // Toggle Favorite
  // -------------------------------
  async function toggleFavorite(article) {
    const alreadyFav = await isFavorite(article.title);

    if (alreadyFav) {
      await removeFavorite(article.title);
      alert("Removed from favorites");
      article.icon_color = colors.white;
    } else {
      await addFavorite(article);
      alert("Added to favorites");
      article.icon_color = colors.red;
    }

    setArticles(prev =>
      prev.map(a =>
        a.title === article.title ? { ...a, icon_color: article.icon_color } : a
      )
    );
  }

  // -------------------------------
  // Add Article to History
  // -------------------------------
  async function openArticle(article) {
    await addToHistory(article);
    navigation.navigate("ExploreArticle", {
      param: article,
      headerTitle: article.title,
      icon_color: article.icon_color,
      tab: "explore"
    });
  }

  function renderDots() {
    return (
      <PagerDotIndicator
        pageCount={articles.length}
        selectedDotStyle={{ backgroundColor: colors.purple }}
      />
    );
  }

  function retryApiCall() {
    if (isConnected) loadArticles();
    else alert("No Internet Connection");
  }

  if (!isConnected) {
    return (
      <View style={{ flex: 1 }}>
        <Offline retryApiCall={retryApiCall} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor={colors.purple} />

      <IndicatorViewPager
        style={{ flex: 2 }}
        indicator={renderDots()}
      >
        {articles.map((article, index) => (
          <View key={index} style={styles.mainCarouselStyle}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => openArticle(article)}
              style={styles.touchableStyle}
            >
              <View style={styles.titleViewStyle}>
                <Text style={styles.titleStyle}>{article.title}</Text>

                <View style={styles.icon_image_view_style}>
                  {article.icon_color === colors.red ? (
                    <MaterialIcons
                      name="favorite"
                      color={colors.purple}
                      size={27}
                      onPress={() => toggleFavorite(article)}
                    />
                  ) : (
                    <SimpleLineIcons
                      name="heart"
                      color={colors.white}
                      size={27}
                      onPress={() => toggleFavorite(article)}
                    />
                  )}
                </View>
              </View>

              <Image
                resizeMode="contain"
                style={styles.imageStyle}
                source={{ uri: article.image }}
              />

              <Text style={styles.teaserStyle} selectable>
                {article.teaser}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.absoluteIconStyle}>
              <MaterialIcons
                name="autorenew"
                color={colors.purple}
                size={28}
                onPress={refreshArticle}
              />
            </TouchableOpacity>
          </View>
        ))}
      </IndicatorViewPager>

      <Loader visible={loading} />
    </View>
  );
}
