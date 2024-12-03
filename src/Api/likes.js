import $api from "./index";

export const setLikeDb = (id) => {
    return $api.post(`/posts/${id}/like`);
}

export const deleteLikeDb = (id) => {
    return $api.delete(`/posts/${id}/like`);
}