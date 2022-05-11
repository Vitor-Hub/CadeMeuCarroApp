import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance, StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { AuthProvider } from "./src/hooks/auth";
import Home from "./src/screens/Home";
import theme from "./src/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Historic from "./src/screens/Historic";
import ParkingContext, {
  LocationInterface,
} from "./src/context/parkingContext";
import {
  getCurrentPositionAsync,
  LocationGeocodedAddress,
  LocationObject,
  reverseGeocodeAsync,
} from "expo-location";
import SignIn from "./src/screens/Signin";
import { createStackNavigator } from "@react-navigation/stack";
import ViewContext from "./src/context/viewContext";

const App = () => {
  const [location, setLocation] = useState<LocationInterface>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [view, setView] = useState<"Home" | "Signin">("Signin");

  const Drawer = createDrawerNavigator();
  const colorScheme = Appearance.getColorScheme();
  const Stack = createStackNavigator();

  const getCurrentLocation = async (): Promise<LocationObject> => {
    let current = await getCurrentPositionAsync({});
    return current;
  };

  const getLocationInfos = async () => {
    let latitude: number = (await getCurrentLocation()).coords.latitude;
    let longitude: number = (await getCurrentLocation()).coords.longitude;

    let address: LocationGeocodedAddress[] = await reverseGeocodeAsync({
      latitude,
      longitude,
    });

    setLocation({
      ...location,
      parkingLocation: {
        latitude: latitude,
        longitude: longitude,
      },
      description: description,
      address: {
        city: address[0].city,
        country: address[0].country,
        isoCountryCode: address[0].isoCountryCode,
        postalCode: address[0].postalCode,
        region: address[0].region,
        street: address[0].street,
        streetNumber: address[0].streetNumber,
      },
    });
  };

  useEffect(() => {
    getLocationInfos();
  }, []);

  return (
    <ViewContext.Provider value={"Signin"}>
      <ParkingContext.Provider value={{ ...location }}>
        <ThemeProvider theme={theme}>
          <StatusBar translucent backgroundColor="transparent" />
          <AuthProvider>
            {view === "Signin" ? (
              <SignIn setView={setView} />
            ) : (
              <NavigationContainer>
                <Drawer.Navigator
                  initialRouteName="Home"
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
                >
                  <Drawer.Screen name="Estacionar" component={Home} />
                  <Drawer.Screen name="Histórico" component={Historic} />
                  <Drawer.Screen name="Configurações" component={Historic} />
                  <Drawer.Screen name="Sair" component={SignIn} />
                </Drawer.Navigator>
              </NavigationContainer>
            )}
          </AuthProvider>
        </ThemeProvider>
      </ParkingContext.Provider>
    </ViewContext.Provider>
  );
};

export default App;
