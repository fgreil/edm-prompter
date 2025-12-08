import React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  Platform,
  Linking
} from 'react-native';

import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import * as colors from "../../../utils/colors";

// Screens
import SplashScreen from './screens/Splash/SplashScreen';
import ExploreScreen from './screens/Explore/Explore';
import FavoriteScreen from './screens/Favorite/Favorite';
import HistoryScreen from './screens/History/History';
import ArticleRenderScreen from './screens/ArticleRender/ArticleRender';
import SearchScreen from './screens/Search/Search';
import SearchedArticleRender from './screens/SearchedArticle/SearchedArticleRender';

// --------------------------------------------------------------
// SEARCH STACK
// --------------------------------------------------------------

const SearchStackNav = createNativeStackNavigator();

function SearchStack() {
  return (
    <SearchStackNav.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.purple },
        headerTintColor: colors.white
      }}
    >
      <SearchStackNav.Screen
        name="SearchMain"
        component={SearchScreen}
        options={{ headerShown: false }}
      />

      <SearchStackNav.Screen
        name="SearchArticle"
        component={SearchedArticleRender}
        options={{ title: "Result" }}
      />
    </SearchStackNav.Navigator>
  );
}

// --------------------------------------------------------------
// STACK HELPERS
// --------------------------------------------------------------

function stackScreenOptions({ navigation }) {
  return {
    headerStyle: { backgroundColor: colors.purple },
    headerTintColor: colors.white,
    headerLeft: () => (
      <MaterialIcons
        name="menu"
        size={27}
        color="white"
        style={{ marginLeft: 12 }}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
    )
  };
}

const Stack = createNativeStackNavigator();

// --------------------------------------------------------------
// EXPLORE STACK
// --------------------------------------------------------------

function ExploreStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="ExploreMain"
        component={ExploreScreen}
        options={{ title: "Explore" }}
      />

      <Stack.Screen
        name="ExploreArticle"
        component={ArticleRenderScreen}
        options={{ title: "" }}
      />

      <Stack.Screen
        name="ExploreSearch"
        component={SearchStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// --------------------------------------------------------------
// FAVORITE STACK
// --------------------------------------------------------------

function FavoriteStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="FavoritesMain"
        component={FavoriteScreen}
        options={{ title: "Favorites" }}
      />

      <Stack.Screen
        name="FavoriteArticle"
        component={ArticleRenderScreen}
        options={{ title: "" }}
      />

      <Stack.Screen
        name="FavoriteSearch"
        component={SearchStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// --------------------------------------------------------------
// HISTORY STACK
// --------------------------------------------------------------

function HistoryStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="HistoryMain"
        component={HistoryScreen}
        options={{ title: "History" }}
      />

      <Stack.Screen
        name="HistoryArticle"
        component={ArticleRenderScreen}
        options={{ title: "" }}
      />

      <Stack.Screen
        name="HistorySearch"
        component={SearchStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// --------------------------------------------------------------
// BOTTOM TABS
// --------------------------------------------------------------

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.purple,
        tabBarInactiveTintColor: colors.gray,
        tabBarIcon: ({ color }) => {
          let iconName =
            route.name === "ExploreTab" ? "public" :
            route.name === "FavoritesTab" ? "favorite" :
            "history";

          return <MaterialIcons name={iconName} size={27} color={color} />;
        }
      })}
    >
      <Tab.Screen name="ExploreTab" component={ExploreStack} options={{ title: "Explore" }} />
      <Tab.Screen name="FavoritesTab" component={FavoriteStack} options={{ title: "Favorites" }} />
      <Tab.Screen name="HistoryTab" component={HistoryStack} options={{ title: "History" }} />
    </Tab.Navigator>
  );
}

// --------------------------------------------------------------
// CUSTOM DRAWER CONTENT
// --------------------------------------------------------------

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: colors.grey }}>
      <StatusBar translucent={false} backgroundColor={colors.purple} />

      <View style={{ padding: 15 }}>
        <Image
          resizeMode={Platform.OS === 'ios' ? 'center' : 'contain'}
          source={{ uri: 'http://www.f418.eu/share/f418.png' }}
          style={{ width: '100%', height: 120 }}
        />

        <Text style={{ color: colors.black, marginTop: 15 }}>
          We aim to make the prototyping step easier.
        </Text>

        <Text style={{ color: colors.black, marginTop: 10 }}>
          This app teaches rapid prototyping methods.
        </Text>

        <Text
          style={{ color: colors.purple, marginTop: 10 }}
          onPress={() => Linking.openURL('http://linkedin.com/in/fgreil')}
        >
          linkedin.com/in/fgreil
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

// --------------------------------------------------------------
// DRAWER NAVIGATION
// --------------------------------------------------------------

const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: 260 }
      }}
    >
      <Drawer.Screen name="Home" component={MainTabs} />
    </Drawer.Navigator>
  );
}

// --------------------------------------------------------------
// ROOT NAVIGATION
// --------------------------------------------------------------

const RootStack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Splash" component={SplashScreen} />
      <RootStack.Screen name="App" component={AppDrawer} />
    </RootStack.Navigator>
  );
}

// --------------------------------------------------------------
// EXPORT — REDUX REMOVED
// --------------------------------------------------------------

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
