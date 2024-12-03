
import axios from "axios";

const $api2 = axios.create({
    withCredentials: true,
    baseURL: `http://localhost:3001/api/`,
    headers: {
        'Accept': 'application/json'
    }
});

$api2.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
});

$api2.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`http://localhost:3001/api/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return $api2.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})

export const changeAvatar = (data) => {
    return $api2.patch(`/users/avatar`, data);
}
