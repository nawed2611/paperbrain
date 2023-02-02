import axios from "axios";

export const client = axios.create({
  baseURL: "https://paperbrain.azurewebsites.net",
  headers: {
    "Content-Type": "application/json",
  },
});
