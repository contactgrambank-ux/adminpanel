import api from "./axios";

export const getDashboardStats = () =>
  api.get("/dashboard/stats");

export const getTransactionChart = () =>
  api.get("/dashboard/transactions-7days");

export const getCreditDebitStats = () =>
  api.get("/dashboard/credit-debit");
