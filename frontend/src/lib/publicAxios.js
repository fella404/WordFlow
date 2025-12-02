import axios from "axios";

const publicApi = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${import.meta.env.VITE_BACKEND_API_URL}/public`
      : "http://localhost:3000/api/public",
});

export default publicApi;
