import $api from "./index";

export const login = (user) => {
    return $api.post('/auth/login', user);
}

export const logout = () => {
    return $api.post('/auth/logout');
}

export const register = (user) => {
    return $api.post('/auth/register', user);
}

export const reset = (email) => {
    return $api.post('/auth/reset', email);
}