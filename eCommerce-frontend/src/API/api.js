import axios from "axios";

const API = axios.create({
    baseURL: "https://ecommerce-backend-navy-chi.vercel.app",
    withCredentials: true // ✅ Ensures cookies (session) are sent with requests
});

export default API;

//baseURL: "https://ecommerce-backend-navy-chi.vercel.app",
