import api from "./axios";

export const getAllTransactions = (page = 1, limit = 10) =>
  api.get(`/txns/admin/all?page=${page}&limit=${limit}`);
