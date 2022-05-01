import React, { useState, useEffect } from "react";
import Map from "../../components/Map";
import {
  getCurrentPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { ButtonContent, Container } from "./style";
import { Appearance, Text } from "react-native";
import Button from "../../components/Button";
import { MapDarkTheme, MapLightTheme } from "../../constants";
import "react-native-gesture-handler";

function Home() {
  const [location, setLocation] = useState<LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>("");

  const colorScheme = Appearance.getColorScheme();

  useEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    console.log("location: ", location);
    console.log("errorMsg: ", errorMsg);
  }, [location, errorMsg]);

  return (
    <Container>
      {errorMsg === "" &&
      location &&
      location?.coords?.latitude &&
      location?.coords?.longitude ? (
        <>
          <Map
            showsUserLocation
            showsMyLocationButton
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            customMapStyle={
              colorScheme === "dark" ? MapDarkTheme : MapLightTheme
            }
          />
          <ButtonContent>
            <Button
              onPress={() => {
                console.log("te amo xuquinha");
              }}
              title="Estacionar"
            />
          </ButtonContent>
        </>
      ) : (
        <Text>{errorMsg}</Text>
      )}
    </Container>
  );
}

export default Home;
