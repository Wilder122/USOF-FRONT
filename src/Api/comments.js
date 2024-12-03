import $api from "./index";

export const createComments = (id, comment) => {
    return $api.post(`/posts/${id}/comments`, comment);
}

export const getCommentsLike = (id) => {
    return $api.get(`/comments/${id}/like`);
}

export const setCommentLike = (id) => {
    return $api.post(`/comments/${id}/like`);
}

export const deleteCommentLike = (id) => {
    return $api.delete(`/comments/${id}/like`);
}


