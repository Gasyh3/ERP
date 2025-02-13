import axios from "axios";

// Configuration globale d'Axios
const api = axios.create({
  baseURL: "http://localhost:8086/api", // Utilisation de NEXT_PUBLIC pour exposer la variable côté client
  withCredentials: true, // Assure que les cookies sont envoyés avec chaque requête si nécessaire
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
