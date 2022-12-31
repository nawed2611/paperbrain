import axios from "axios";

export const client = axios.create({
  baseURL: "https://flask-production-68e8.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});
