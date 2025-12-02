import axios from "axios";

const adminApi = axios.create({
  baseURL: "http://localhost:3000/api/admin",
});

adminApi.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("accessToken");

    // Jika token ada, tambahkan ke header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response interceptor untuk handle token expiry
adminApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Jika error 428 (No token) atau 401 (Expired/Invalid)
    if (
      (error.response?.status === 428 || error.response?.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        // ✅ Request refresh token
        const refreshResponse = await axios.post(
          "http://localhost:5000/api/auth/refresh-token",
          { refreshToken }
        );

        // ✅ SIMPAN BOTH NEW TOKENS (sesuai dengan response controller Anda)
        const newAccessToken = refreshResponse.data.accessToken;
        const newRefreshToken = refreshResponse.data.newRefreshToken; // ⚠️ Perhatikan: newRefreshToken bukan refreshToken

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken); // Simpan newRefreshToken

        // Retry original request dengan token baru
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Jika refresh gagal, logout user
        console.error("Refresh token failed:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default adminApi;
