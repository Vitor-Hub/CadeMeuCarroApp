import React, { useState, useEffect } from "react";
import Map from "../../components/Map";
import {
  getCurrentPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync,
  LocationGeocodedAddress,
  reverseGeocodeAsync,
} from "expo-location";
import { ButtonContent, Container } from "./styles";
import { Appearance, Text } from "react-native";
import Button from "../../components/Button";
import { MapDarkTheme, MapLightTheme } from "../../constants";
import "react-native-gesture-handler";
import { postParking } from "../../services/parkings";
import ParkingContext from "../../context/parkingContext";

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
  const [isParking, setIsParking] = useState<boolean>(false);

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
    console.log("errorMsg: ", errorMsg);
  }, [errorMsg]);

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

    await postParking({ latitude, longitude, description })
      .then((response) => {
        console.log(response);
        setIsParking(true);
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };

  const goSearch = () => {
    setIsParking(false);
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
              {isParking ? (
                <Button
                  color="#ff4f22"
                  onPress={() => goSearch()}
                  title="Buscar o Carro"
                />
              ) : (
                <Button onPress={() => goParking()} title="Estacionar" />
              )}
            </ButtonContent>
          </>
        ) : (
          <Text>{errorMsg}</Text>
        )}
      </Container>
    </ParkingContext.Provider>
  );
}

export default Home;
