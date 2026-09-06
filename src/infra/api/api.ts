import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

export const refreshApi = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});