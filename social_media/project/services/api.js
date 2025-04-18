import axios from 'axios';

const BASE_URL = "http://20.244.56.144/evaluation-service";









export const getUsers = () => axios.get(`${BASE_URL}/users`);
export const getPostsByUserId = (userId) => axios.get(`${BASE_URL}/users/${userId}/posts`);
export const getCommentsByPostId = (postId) => axios.get(`${BASE_URL}/posts/${postId}/comments`);
