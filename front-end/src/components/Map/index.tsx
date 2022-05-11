import React, { useContext } from "react";
import { Container } from "./styles";
import MapVewDirections from "react-native-maps-directions";
import ParkingContext from "../../context/parkingContext";

const Map = ({ ...rest }) => {
  const ParkingContextApi = useContext(ParkingContext);
  const apiKey = "AIzaSyBVLZkRfjQMnSKcFH-Kpw_31do4KEOzRew";

  const coordinates: any = [
    {
      latitude:
        ParkingContextApi.currentLocation &&
        ParkingContextApi.currentLocation.latitude,
      longitude:
        ParkingContextApi.currentLocation &&
        ParkingContextApi.currentLocation.longitude,
    },
    {
      latitude:
        ParkingContextApi.parkingLocation &&
        ParkingContextApi.parkingLocation.latitude,
      longitude:
        ParkingContextApi.parkingLocation &&
        ParkingContextApi.parkingLocation.longitude,
    },
  ];

  return (
    <Container {...rest}>
      {coordinates[1] && (
        <MapVewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey={apiKey}
          strokeWidth={3}
          strokeColor="red"
        />
      )}
    </Container>
  );
};

export default Map;
