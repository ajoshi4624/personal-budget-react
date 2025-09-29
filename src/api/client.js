import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "", 
  timeout: 10000,
});

client.interceptors.response.use(
  (r) => r,
  (err) => {
    console.error("API error:", err?.response || err?.message || err);
    return Promise.reject(err);
  }
);

export default client;
