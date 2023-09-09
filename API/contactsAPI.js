import axios from "axios";

const baseURL = "https://contacts-api-q8y1.onrender.com"; // Replace with your API base URL
const instance = axios.create({
  baseURL,
});

// Function to set the Bearer token in the headers
const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

export { instance as apiInstance, setAuthToken };
