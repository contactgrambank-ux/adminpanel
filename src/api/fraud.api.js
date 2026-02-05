import api from "./axios";

// Dashboard cards
export const getFraudStats = () =>
  api.get("/fraud/stats");

// Fraud alerts table
export const getFraudAlerts = () =>
  api.get("/fraud/alerts");

// Blacklisted accounts
export const getFraudAccounts = () =>
  api.get("/fraud/accounts");

// Actions
export const freezeUser = (userId) =>
  api.post("/fraud/freeze-user", { userId });

export const unfreezeUser = (userId) =>
  api.post("/fraud/unfreeze-user", { userId });

export const escalateTransaction = (transactionId) =>
  api.post("/fraud/escalate", { transactionId });
