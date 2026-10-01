// src/features/admin/user-management/api/adminWalletApi.js
// TODO: Adjust paths
import adminApi from "../../../../shared/api/adminAxios";

export const adminWalletApi = {
  adjustWallet: (payload, idempotencyKey) => 
    adminApi.post('/manual-founding/wallet-adjust', payload, {
    //  headers: { 'X-Idempotency-Key': idempotencyKey },
      metadata: { idempotent: true } // Triggers idempotency interceptor logic
    }),

  reverseTransaction: (payload, idempotencyKey) => 
    adminApi.post('/manual-founding/wallet-Reversal', payload, {
   //   headers: { 'X-Idempotency-Key': idempotencyKey },
      metadata: { idempotent: true }
    })
};