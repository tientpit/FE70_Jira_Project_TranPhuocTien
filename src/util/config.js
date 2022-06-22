import axios from "axios";

export const DOMAIN = "https://jiranew.cybersoft.edu.vn/";
export const CYBERSOFT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzAiLCJIZXRIYW5TdHJpbmciOiIxNC8xMC8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NjU3MDU2MDAwMDAiLCJuYmYiOjE2Mzc0Mjc2MDAsImV4cCI6MTY2NTg1MzIwMH0.RAzH9H37ZyQ8ZT6A62fw3_bDfJOCq0A9vz08qT262EU";
export const TOKEN = "access_token";

export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});



http.interceptors.request.use(
  (config) => {
    const ACCESS_TOKEN = "Bearer " + localStorage.getItem(TOKEN);
    config.headers = {
      ...config.headers,
      TokenCybersoft: CYBERSOFT_TOKEN,
      Authorization: ACCESS_TOKEN,
    };
    return config;
  },
  (errors) => {
    return Promise.reject({ errors });
  }
);
