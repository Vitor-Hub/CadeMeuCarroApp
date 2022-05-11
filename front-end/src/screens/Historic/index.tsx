import { LocationGeocodedAddress, reverseGeocodeAsync } from "expo-location";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import ParkingContext, {
  LocationInterface,
} from "../../context/parkingContext";
import { getAllParkings } from "../../services/parkings";
import IPostParking from "../../services/parkings/interfaces";
import { HistoricContent, HistoricView, Title } from "./styles";

interface IAddressObj {
  Cidade?: string | null;
  Rua?: string | null;
  Numero?: string | null;
  CEP?: string | null;
  Pais?: string | null;
  Data?: string | undefined;
}

function Historic() {
  const [parkings, setParkings] = useState<IPostParking[]>([]);
  const [parkingsAddress, setParkingsAddress] = useState<IAddressObj[]>([]);

  useEffect(() => {
    getParkings();
  }, []);

  useEffect(() => {
    convertArrayToAddress();
  }, [parkings]);

  const getParkings = async () => {
    const response = await getAllParkings();
    setParkings(response);
  };

  const mountAddress = async (item: IPostParking): Promise<IAddressObj> => {
    let latitude = item.latitude;
    let longitude = item.longitude;
    let address: LocationGeocodedAddress[] = await reverseGeocodeAsync({
      latitude,
      longitude,
    });
    let addressObj: IAddressObj = {
      Data: item.createdAt,
      Cidade: address[0]?.city,
      Rua: address[0]?.street,
      Numero: address[0]?.streetNumber,
      CEP: address[0]?.postalCode,
      Pais: address[0]?.country,
    };

    return addressObj;
  };

  const convertArrayToAddress = () => {
    let arr: IAddressObj[] = [];
    parkings &&
      !!parkings.length &&
      parkings.map(async (item, index) => {
        arr.push(await mountAddress(item));
      });

    setParkingsAddress(arr);
  };

  const renderItem = ({ item }: { item: IPostParking }) => {
    return (
      <HistoricContent>
        <Text>Data: {item.createdAt}</Text>
        <Text>Latitude: {item.latitude}</Text>
        <Text>Longitude: {item.longitude}</Text>
        <Text>Descrição: {item.description}</Text>
      </HistoricContent>
    );
  };

  return (
    <HistoricView>
      <Title>Histórico</Title>
      <FlatList
        data={parkings}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
      />
    </HistoricView>
  );
}

export default Historic;
