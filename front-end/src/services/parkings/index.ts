import api from "../api";
import IPostParking from "./interfaces";

export const getParkingById = async (id: number) => {
  const returnApi = await api
    .get(`/parking`, {
      params: id,
    })
    .then((response: object | any) => response)
    .then((data) => data.data)
    .catch((err) => console.log(err));
  return returnApi;
};

export const getAllParkings = async () => {
  const returnApi = await api
    .get(`/parking`)
    .then((response: object | any) => response)
    .then((data) => data.data)
    .catch((err) => console.log(err));
  return returnApi;
};

export const postParking = async (body: IPostParking) => {
  await api
    .post("/parking", {
      ...body,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
