import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5959", // Replace with your backend URL
    withCredentials: true // ✅ Ensures cookies (session) are sent with requests
});

export default API;
