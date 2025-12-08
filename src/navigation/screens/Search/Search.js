// src/navigation/screens/Search/Search.js

import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StatusBar,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView
} from "react-native";

import { MaterialIcons, Entypo } from "@expo/vector-icons";
import * as colors from "../../../utils/colors";
import callApi from "../../../lib/apicaller";
import styles from "./styles";
import SearchHistoryList from "./SearchHistoryList";

// SQLite search history helpers
import {
  getSearchHistory,
  addKeyword
} from "../../../database/services/search";

export default function Search({ navigation }) {
  const [textInput, setTextInput] = useState("");
  const [history, setHistory] = useState([]);    // array of strings
  const [results, setResults] = useState([]);    // search results
  const [showHistory, setShowHistory] = useState(true);
  const [searchDone, setSearchDone] = useState(false);

  // ----------------------------------
  // Load search history only once
  // ----------------------------------
  useEffect(() => {
    (async () => {
      const stored = await getSearchHistory();
      setHistory(stored);
    })();
  }, []);

  // ----------------------------------
  // Perform search
  // ----------------------------------
  async function handleSearch(keywordOverride) {
    const keyword = (keywordOverride || textInput).trim();

    if (!keyword || keyword.length < 3) {
      alert("Please enter at least 3 characters");
      return;
    }

    // Save keyword to SQLite
    const updatedHistory = await addKeyword(keyword);
    setHistory(updatedHistory);

    // Fetch results
    await fetchData(keyword);
  }

  async function fetchData(keyword) {
    try {
      // backend contract: search/{keyword}/filter
      const endpoint = `search/${keyword}/filter`;
      const response = await callApi(endpoint, "GET");

      setResults(response || []);
      setShowHistory(false);
      setSearchDone(true);
    } catch (err) {
      alert("Failed to fetch data from server.");
    }
  }

  // ----------------------------------
  // Helper UI blocks
  // ----------------------------------
  function renderIcon() {
    return (
      <MaterialIcons
        name="search"
        size={27}
        color={colors.white}
        style={styles.menuIcon}
        onPress={() => handleSearch()}
      />
    );
  }

  function renderEmptyScreen() {
    return (
      <View style={styles.blankScreenStyle}>
        <View style={styles.iconContainerStyle}>
          <MaterialIcons name="search" size={50} color={colors.gray} />
        </View>
        <Text style={styles.blankScreenHeaderTextStyle}>No Data Found!</Text>
        <Text style={styles.detailTextStyle}>Try another keyword.</Text>
      </View>
    );
  }

  function renderResults() {
    if (!searchDone) return null;

    if (!results.length) return renderEmptyScreen();

    return (
      <ScrollView
        contentContainerStyle={{ paddingVertical: 5, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {results.map((element, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardStyle}
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate("SearchArticle", {
                param: element,
                headerTitle: element.title
              })
            }
          >
            <View style={styles.cardHeaderStyle}>
              <Image
                source={{ uri: element.image }}
                style={styles.cardHeaderImageStyle}
              />
              <Text numberOfLines={2} style={styles.headerTitleStyle}>
                {element.title}
              </Text>
            </View>

            <View style={styles.cardTeaserViewStyle}>
              <Text numberOfLines={4} style={styles.cardTeaserTextStyle}>
                {element.teaser}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 50 }} />
      </ScrollView>
    );
  }

  async function handleHistoryPress(keyword) {
    setTextInput(keyword);
    setShowHistory(false);
    await fetchData(keyword);
  }

  function handleBackPress() {
    if (showHistory) {
      if (!textInput.length) navigation.goBack();
      else {
        setTextInput("");
        setSearchDone(false);
      }
    } else {
      // Going back from results → show history again
      setShowHistory(true);
      setResults([]);
      setSearchDone(false);
      setTextInput("");
    }
  }

  // ----------------------------------
  // UI
  // ----------------------------------
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar translucent={false} backgroundColor={colors.purple} />

      {/* Header */}
      <SafeAreaView style={styles.headerStyles}>
        <MaterialIcons
          name="arrow-back"
          size={27}
          color={colors.white}
          style={styles.menuIcon}
          onPress={handleBackPress}
        />

        <View style={styles.textInputViewStyle}>
          <TextInput
            style={styles.headerTextInputStyle}
            placeholder="Search"
            placeholderTextColor={colors.white}
            selectionColor={colors.white}
            value={textInput}
            returnKeyType="search"
            onSubmitEditing={() => handleSearch()}
            onChangeText={setTextInput}
          />

          <Entypo
            name="cross"
            size={18}
            color={colors.white}
            style={styles.menuIcon}
            onPress={() => {
              setTextInput("");
              setResults([]);
              setSearchDone(false);
              setShowHistory(true);
            }}
          />
        </View>

        {renderIcon()}
      </SafeAreaView>

      {/* History OR Results */}
      {showHistory ? (
        <SearchHistoryList
          data={history}
          onPress={keyword => handleHistoryPress(keyword)}
        />
      ) : (
        <View style={{ flex: 1 }}>{renderResults()}</View>
      )}
    </KeyboardAvoidingView>
  );
}
