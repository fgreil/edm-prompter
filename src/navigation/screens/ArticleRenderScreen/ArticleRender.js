import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  Alert
} from "react-native";

import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import RNMarkdownFormatter from "../../RNMarkdownFormatter";
import styles from "./styles";
import * as colors from "../../../utils/colors";

// SQLite Favorites
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite
} from "../../../database/services/favorites";

export default function ArticleRender({ route, navigation }) {
  const { param: article, tab } = route.params;

  const [iconColor, setIconColor] = useState(colors.white);

  // ----------------------------------------------------------------------
  // Load current favorite state from SQLite
  // ----------------------------------------------------------------------
  useEffect(() => {
    async function loadFavoriteState() {
      const fav = await isFavorite(article.title);
      setIconColor(fav ? colors.red : colors.white);
    }
    loadFavoriteState();
  }, []);

  // ----------------------------------------------------------------------
  // Update header heart icon
  // ----------------------------------------------------------------------
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: article.title,
      headerRight: () =>
        iconColor === colors.red ? (
          <MaterialIcons
            name="favorite"
            color={colors.white}
            size={27}
            style={styles.menuIcon}
            onPress={toggleFavorite}
          />
        ) : (
          <SimpleLineIcons
            name="heart"
            color={colors.white}
            size={27}
            style={styles.menuIcon}
            onPress={toggleFavorite}
          />
        )
    });
  }, [navigation, iconColor]);

  // ----------------------------------------------------------------------
  // Toggle favorite (SQLite-only)
  // ----------------------------------------------------------------------
  async function toggleFavorite() {
    const exists = await isFavorite(article.title);

    if (exists) {
      await removeFavorite(article.title);
      setIconColor(colors.white);

      Alert.alert("Removed", "Article removed from favorites.", [
        {
          text: "OK",
          onPress: () => {
            // If user removed a favorite while viewing it ON the favorites tab,
            // we pop back so they see the updated list.
            if (tab === "favorite") {
              navigation.goBack();
            }
          }
        }
      ]);
    } else {
      // Add a copy containing the red icon (for UI consistency)
      await addFavorite({ ...article, icon_color: colors.red });

      setIconColor(colors.red);
      Alert.alert("Added", "Article added to favorites.");
    }
  }

  // ----------------------------------------------------------------------
  // Description renderer
  // ----------------------------------------------------------------------
  function renderDescription(text) {
    return (
      <View style={styles.descriptionViewStyle}>
        <RNMarkdownFormatter
          defaultStyles={[styles.teaserStyle]}
          selectable
          numberOfLines={0}
          text={text || ""}
          regexArray={[
            {
              type: "hyperlink",
              styles: [styles.hyperlinkText],
              pattern: ["[]()"],
              patternType: "asymmetric",
              groups: 2
            }
          ]}
        />
      </View>
    );
  }

  // ----------------------------------------------------------------------
  // MAIN UI
  // ----------------------------------------------------------------------
  return (
    <View style={styles.containerStyle}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* TITLE */}
        <Text style={[styles.headerTextStyle, { paddingTop: 10 }]}>
          {article.title}
        </Text>

        {/* IMAGE */}
        <View style={styles.imageViewStyle}>
          <Image
            resizeMode={Platform.OS === "ios" ? "center" : "contain"}
            source={
              article.image
                ? { uri: article.image }
                : require("../../../images/placeholder.png")
            }
            style={[styles.imageStyle, { marginBottom: 15 }]}
          />
        </View>

        {/* TEASER */}
        <Text
          selectable
          style={[
            styles.teaserStyle,
            { paddingBottom: 10, color: colors.black }
          ]}
        >
          {article.teaser}
        </Text>

        {/* PROPERTIES */}
        <View style={styles.tableStyles}>
          <View style={styles.propertiesStyle}>
            <Text style={styles.headerTextStyle}>Duration</Text>
            <Text selectable style={styles.descriptionTextStyle}>
              {article?.properties?.propDuration || ""}
            </Text>
          </View>

          <View style={styles.propertiesStyle}>
            <Text style={styles.headerTextStyle}>Evaluation Time</Text>
            <Text selectable style={styles.descriptionTextStyle}>
              {article?.properties?.propEvaluationType || ""}
            </Text>
          </View>

          <View style={styles.propertiesStyle}>
            <Text style={styles.headerTextStyle}>Time Dependency</Text>
            <Text selectable style={styles.descriptionTextStyle}>
              {article?.properties?.propTimeDependency || ""}
            </Text>
          </View>

          <View style={styles.propertiesStyle}>
            <Text style={styles.headerTextStyle}>User Participation</Text>
            <Text selectable style={styles.descriptionTextStyle}>
              {article?.properties?.propUserParticipation || ""}
            </Text>
          </View>
        </View>

        {/* STEPS */}
        <Text style={styles.headerTextStyle}>Short Instructions</Text>
        {article.steps?.map((step, index) => (
          <View key={index} style={styles.descriptionViewStyle}>
            <RNMarkdownFormatter
              defaultStyles={[styles.teaserStyle]}
              selectable
              numberOfLines={0}
              text={`${index + 1}. ${step}`}
              regexArray={[
                {
                  type: "italic",
                  styles: [],
                  pattern: ["*"],
                  patternType: "symmetric",
                  groups: 1
                },
                {
                  type: "hyperlink",
                  styles: [styles.hyperlinkText],
                  pattern: ["[]()"],
                  patternType: "asymmetric",
                  groups: 2
                }
              ]}
            />
          </View>
        ))}

        {/* DESCRIPTION */}
        <Text style={[styles.headerTextStyle, { paddingTop: 12 }]}>
          Description
        </Text>

        {renderDescription(article.description)}

        {/* REFERENCES */}
        <Text style={styles.headerTextStyle}>References</Text>
        {Object.keys(article.references || {}).map((key, index) => (
          <View key={index} style={styles.descriptionViewStyle}>
            <RNMarkdownFormatter
              defaultStyles={[styles.teaserStyle]}
              selectable
              numberOfLines={0}
              text={`[${index + 1}] ${article.references[key]}`}
              regexArray={[
                {
                  type: "italic",
                  styles: [],
                  pattern: ["*"],
                  patternType: "symmetric",
                  groups: 1
                },
                {
                  type: "hyperlink",
                  styles: [styles.hyperlinkText],
                  pattern: ["[]()"],
                  patternType: "asymmetric",
                  groups: 2
                }
              ]}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
