import React from "react";
import { View, Text, Image, ScrollView, Platform } from "react-native";
import styles from "./styles";
import * as colors from "../../../utils/colors";

export default function SearchedArticleRender({ route, navigation }) {
  // Modern navigation API (React Navigation v6)
  const { param: article, headerTitle } = route.params || {};

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: headerTitle || "Result"
    });
  }, [navigation, headerTitle]);

  if (!article) {
    return (
      <View style={[styles.containerStyle, { justifyContent: "center", alignItems: "center" }]}>
        <Text>No article data.</Text>
      </View>
    );
  }

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
            source={{ uri: article.image }}
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
      </ScrollView>
    </View>
  );
}
