import { createContext } from "react";

export interface LocationInterface {
  currentLocationlatitude?: LocationInterface;
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
  createdAt?: string;
}

const ParkingContext = createContext<LocationInterface>({});
export default ParkingContext;
