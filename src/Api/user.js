import $api from "./index";

export const getUserById = (id) => {
    return $api.get(`/users/${id}`);
}

export const getPostsByUser = (id) => {
    return $api.get(`/users/${id}/posts`);
}

