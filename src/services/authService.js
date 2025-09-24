import axios from 'axios';
import {urlLogin} from "../constants/endpoints.js";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
    baseURL: API_BASE_URL,
});

const authService = {
    login: (credentials) => api.post(urlLogin, credentials),
    validateToken: (token) => api.get('/auth/validateToken', {
        headers: { Authorization: `Bearer ${token}` }
    }),
    refreshToken: (token) => api.post('/auth/refreshToken', { token })
};

export default authService;