import axios from "axios";

const publicApi = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_API_URL}/public`,
});

export default publicApi;
