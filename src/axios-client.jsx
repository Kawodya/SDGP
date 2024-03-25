import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // Allow requests from all origins (change this as needed)
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Allow specific HTTP methods
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept", // Allow specific headers
  },
});

export default axiosClient;
