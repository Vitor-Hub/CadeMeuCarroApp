import React, { useEffect } from "react";
import { Appearance, StatusBar, StyleSheet } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { AuthProvider } from "./src/hooks/auth";
import Home from "./src/screens/Home";
import SignIn from "./src/screens/Signin";
import theme from "./src/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const App = () => {
  const Drawer = createDrawerNavigator();

  const colorScheme = Appearance.getColorScheme();

  return (
    <ThemeProvider theme={theme}>
      <StatusBar translucent backgroundColor="transparent" />
      <AuthProvider>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen
              name="Home"
              component={Home}
              options={{
                swipeEnabled: false,
                headerTitleStyle: {
                  display: "none",
                  backgroundColor: "transparent",
                },
                headerTransparent: true,
                headerTintColor:
                  colorScheme === "dark"
                    ? theme.COLORS.WHITE
                    : theme.COLORS.PRIMARY,
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
