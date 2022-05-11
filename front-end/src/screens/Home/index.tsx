import React, { useState, useEffect } from "react";
import Map from "../../components/Map";
import {
  getCurrentPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync,
  LocationGeocodedAddress,
  reverseGeocodeAsync,
} from "expo-location";
import { ButtonContent, Container, InputContent } from "./styles";
import { Appearance, Text } from "react-native";
import Button from "../../components/Button";
import { MapDarkTheme, MapLightTheme } from "../../constants";
import "react-native-gesture-handler";
import { postParking } from "../../services/parkings";
import ParkingContext from "../../context/parkingContext";
import Input from "../../components/Input";

interface LocationInterface {
  parkingLocation?: {
    longitude: number;
    latitude: number;
  };
  currentLocation?: {
    longitude: number;
    latitude: number;
  };
  description?: string;
  address?: {
    city: string | null;
    country: string | null;
    isoCountryCode: string | null;
    postalCode: string | null;
    region: string | null;
    street: string | null;
    streetNumber: string | null;
  };
}

function Home() {
  const [location, setLocation] = useState<LocationInterface>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [buttonStatus, setButtonStatus] = useState<
    "BeforeParking" | "Parking" | "AfterParking"
  >("BeforeParking");

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

  const getCurrentLocation = async (): Promise<LocationObject> => {
    let current = await getCurrentPositionAsync({});
    return current;
  };

  const goParking = async () => {
    let latitude: number = (await getCurrentLocation()).coords.latitude;
    let longitude: number = (await getCurrentLocation()).coords.longitude;

    let address: LocationGeocodedAddress[] = await reverseGeocodeAsync({
      latitude,
      longitude,
    });

    setLocation({
      ...location,
      parkingLocation: {
        latitude: -22.9111739,
        longitude: -43.2361323,
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

    await postParking({ latitude, longitude, description })
      .then((response) => {
        console.log(response);
        setButtonStatus("AfterParking");
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };

  const goSearch = () => {
    setButtonStatus("BeforeParking");
  };

  return (
    <ParkingContext.Provider value={{ ...location }}>
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
                latitude: -22.9111739,
                longitude: -43.2361323,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              customMapStyle={
                colorScheme === "dark" ? MapDarkTheme : MapLightTheme
              }
            />
            <ButtonContent>
              {buttonStatus === "BeforeParking" ? (
                <Button
                  onPress={() => setButtonStatus("Parking")}
                  title="Estacionar"
                />
              ) : buttonStatus === "Parking" ? (
                <Button
                  color="#ff4f22"
                  onPress={() => goParking()}
                  title="Buscar o Carro"
                />
              ) : (
                <Button
                  color="#00FF00"
                  onPress={() => goSearch()}
                  title="Encontrei!"
                />
              )}
            </ButtonContent>
            <InputContent>
              <Input
                placeholder="Digite uma descrição (opcional)"
                type="primary"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(newText) => setDescription(newText)}
              />
            </InputContent>
          </>
        ) : (
          <Text>{errorMsg}</Text>
        )}
      </Container>
    </ParkingContext.Provider>
  );
}

export default Home;
