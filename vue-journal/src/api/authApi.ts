import axios from "axios";

const authApi = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
  params: {
    key: "AIzaSyA-JA5w-qI4o_vFzPOCz5BoemvCoRahNNE",
  },
});

export { authApi };
