import axios from "axios";

const $api = axios.create({
    withCredentials: true,
    baseURL: `http://localhost:3001/api/`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`http://localhost:3001/api/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})

export default $api;