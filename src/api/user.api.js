import api from "./axios";

export const getAllUsers = (page = 1, limit = 10) =>
  api.get(`/users/admin/all-users?page=${page}&limit=${limit}`);
