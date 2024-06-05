import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { getLocalIPAddress } from "@/utils/getLocalIp";

const IP = `http://localhost:`;
const PORT = `3000`;

const api = axios.create({
  baseURL: `${IP}${PORT}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const bebe = async () => {
  const foo = await getLocalIPAddress();
  if (foo) {
    console.log(foo);
  }
};

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export default api;
