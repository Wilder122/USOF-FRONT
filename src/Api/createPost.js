import $api from "./index";

export const createPost = (post) => {
    return $api.post('/posts', post);
}

export const changePost = (id,post) => {
    return $api.patch(`/posts/${id}`, post);
}