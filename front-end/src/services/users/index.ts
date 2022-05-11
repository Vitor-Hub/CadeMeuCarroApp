import api from "../api";
import { IPostUser } from "./interfaces";

export const getUserById = async (id: number) => {
  await fetch("http://187.46.84.12:8000/user/4")
    .then((response) => response.json())
    .then((json) => console.log(json));
};

export const postUser = async (body: IPostUser) => {
  await api
    .post("/user", {
      ...body,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
