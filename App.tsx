import React from "react";
import { Appearance, StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { AuthProvider } from "./src/hooks/auth";
import Home from "./src/screens/Home";
import DrawerMenu from "./src/screens/DrawerMenu";
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
          <Drawer.Navigator
            screenOptions={{
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
            drawerContent={(props) => <DrawerMenu {...props} />}
          >
            <Drawer.Screen name="Minhas Viagens" component={Home} />
            <Drawer.Screen name="Configurações" component={Home} />
          </Drawer.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
