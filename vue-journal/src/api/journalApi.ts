import axios from "axios";

const journalApi = axios.create({
  baseURL:
    "https://vue-demos-e5c4e-default-rtdb.europe-west1.firebasedatabase.app",
});

journalApi.interceptors.request.use((config) => {
  config.params = {
    auth: localStorage.getItem("idToken"),
  };

  return config;
});

export default journalApi;
