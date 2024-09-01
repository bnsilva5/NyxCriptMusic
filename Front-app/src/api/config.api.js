import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:4000', // URL base de tu backend
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado en el localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;