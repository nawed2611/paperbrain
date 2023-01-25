import axios from "axios";

export const client = axios.create({
  baseURL: "https://paperbrain.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
