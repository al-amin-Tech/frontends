// src/features/admin/user-management/hooks/useWalletActions.js
// TODO: Adjust paths
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminWalletApi } from '../api/adminWalletApi';
import Alert from '../../../../shared/components/ui/Alert'; // TODO: Adjust path

export const useWalletAdjustment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, idempotencyKey }) => 
      adminWalletApi.adjustWallet(payload, idempotencyKey),
    onSuccess: async (response) => {
      await Alert({ 
        type: 'success', 
        title: 'Adjustment Successful', 
        message: `Wallet updated. New Balance: ₦${response.data.closingBalance}` 
      });
      // Invalidate user details to fetch the new authoritative balance
      queryClient.invalidateQueries(['adminUserDetails']);
    },
    onError: async (error) => {
      await Alert({ 
        type: 'error', 
        title: 'Adjustment Failed', 
        message: error?.response?.data?.message || 'An error occurred during adjustment.' 
      });
    }
  });
};

export const useTransactionReversal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, idempotencyKey }) => 
      adminWalletApi.reverseTransaction(payload, idempotencyKey),
    onSuccess: async (response) => {
      await Alert({ 
        type: 'success', 
        title: 'Reversal Successful', 
        message: response.data.message || 'Transaction has been successfully reversed.' 
      });
      queryClient.invalidateQueries(['adminUserDetails']);
      queryClient.invalidateQueries(['adminUserPurchases']);
      queryClient.invalidateQueries(['adminUserDeposits']);
    },
    onError: async (error) => {
      await Alert({ 
        type: 'error', 
        title: 'Reversal Failed', 
        message: error?.response?.data?.message || error?.message || 'An error occurred during reversal.' 
      });
    }
  });
};