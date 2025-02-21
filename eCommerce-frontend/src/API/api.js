import axios from "axios";

const API = axios.create({
    baseURL: "https://ecommerce-backend-navy-chi.vercel.app", // Replace with your backend URL
    withCredentials: true // ✅ Ensures cookies (session) are sent with requests
});

export default API;
