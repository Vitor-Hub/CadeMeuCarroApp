import React, { useState, useEffect } from "react";
import Map from "../../components/Map";
import {
  getCurrentPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { ButtonContent, Container } from "./styles";
import { Appearance, Text } from "react-native";
import Button from "../../components/Button";
import { MapDarkTheme, MapLightTheme } from "../../constants";
import "react-native-gesture-handler";

interface LocationInterface {
  parkingLocation?: {
    longitude: number;
    latitude: number;
  };
  currentLocation?: {
    longitude: number;
    latitude: number;
  };
}

function Home() {
  const [location, setLocation] = useState<LocationInterface>();
  const [errorMsg, setErrorMsg] = useState<string>("");

  const colorScheme = Appearance.getColorScheme();

  useEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let current = await getCurrentLocation();
      setLocation({
        ...location,
        currentLocation: {
          latitude: current.coords.latitude,
          longitude: current.coords.longitude,
        },
      });
    })();
  }, []);

  useEffect(() => {
    console.log("location: ", location);
    console.log("errorMsg: ", errorMsg);
  }, [location, errorMsg]);

  const getCurrentLocation = async (): Promise<LocationObject> => {
    let current = await getCurrentPositionAsync({});
    return current;
  };

  const goParking = async () => {
    let latitude = (await getCurrentLocation()).coords.latitude;
    let longitude = (await getCurrentLocation()).coords.longitude;

    setLocation({
      ...location,
      parkingLocation: {
        latitude: latitude,
        longitude: longitude,
      },
    });
  };

  return (
    <Container>
      {errorMsg === "" &&
      location &&
      location?.currentLocation?.latitude &&
      location?.currentLocation?.longitude ? (
        <>
          <Map
            showsUserLocation
            showsMyLocationButton
            initialRegion={{
              latitude: location.currentLocation.latitude,
              longitude: location.currentLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            customMapStyle={
              colorScheme === "dark" ? MapDarkTheme : MapLightTheme
            }
          />
          <ButtonContent>
            <Button onPress={() => goParking()} title="Estacionar" />
          </ButtonContent>
        </>
      ) : (
        <Text>{errorMsg}</Text>
      )}
    </Container>
  );
}

export default Home;
