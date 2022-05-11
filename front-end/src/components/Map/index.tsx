import React, { useContext, useEffect, useState } from "react";
import { Container } from "./styles";
import MapVewDirections from "react-native-maps-directions";
import ParkingContext from "../../context/parkingContext";

const Map = ({ ...rest }) => {
  const ParkingContextApi = useContext(ParkingContext);
  const apiKey = "AIzaSyBVLZkRfjQMnSKcFH-Kpw_31do4KEOzRew";

  const [destinationLoc, setDestionationLoc] = useState({
    latitude: ParkingContextApi.parkingLocation?.latitude,
    longitude: ParkingContextApi.parkingLocation?.longitude,
  });

  useEffect(() => {
    setDestionationLoc({
      latitude:
        ParkingContextApi.parkingLocation &&
        Number(ParkingContextApi.parkingLocation.latitude),
      longitude:
        ParkingContextApi.parkingLocation &&
        Number(ParkingContextApi.parkingLocation.longitude),
    });
  }, [ParkingContextApi.parkingLocation]);

  useEffect(() => {
    console.log("coordinates: ", destinationLoc);
  }, [destinationLoc]);

  return (
    <Container {...rest}>
      {destinationLoc &&
        destinationLoc.latitude &&
        destinationLoc.longitude && (
          <MapVewDirections
            origin={{ latitude: -22.9111739, longitude: -43.2361323 }}
            destination={{ latitude: -22.9412221, longitude: -43.3594147 }}
            apikey={apiKey}
            strokeWidth={3}
            strokeColor="red"
          />
        )}
    </Container>
  );
};

export default Map;
