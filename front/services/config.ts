import axios from "axios";

export const axiosJWT = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

axiosJWT.interceptors.request.use(
  async (config) => {
    const currentDate = new Date();
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/token`, {
      withCredentials: true,
    });
    config.headers.authorization = `Bearer ${res.data.accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
