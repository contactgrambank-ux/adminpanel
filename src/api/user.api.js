import api from "./axios";

export const getAllUsers = (page = 1, limit = 10) =>
  api.get(`/users/admin/all-users?page=${page}&limit=${limit}`);

export const getUserTransactions = (userId, page = 1, limit = 5) => {
  return api.get(`/txns/admin/user/${userId}?page=${page}&limit=${limit}`);
};
export const freezeUser = (userId) =>
  api.post(`/users/admin/freeze/${userId}`);

// ✅ unfreeze user
export const unfreezeUser = (userId) =>
  api.post(`/users/admin/unfreeze/${userId}`);

export const addBalanceToUser = (payload) =>
  api.post("/users/admin/add-balance", payload);

