import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.68:8080/api",
  withCredentials: true,
});

export const refreshApi = axios.create({
  baseURL: "http://192.168.1.68:8080/api",
  withCredentials: true,
});