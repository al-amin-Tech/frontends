// src/features/admin/user-management/components/TransactionReversalModal.jsx
// TODO: Adjust paths
import { useState } from 'react';
import { useTransactionReversal } from '../hooks/useWalletActions';
import { Modal, Button, Input, Alert } from '../../../../shared/components/ui'; // TODO: Adjust path

export default function TransactionReversalModal({ open, onClose, transaction }) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const reversalMutation = useTransactionReversal();

  const isFormValid = reason.trim().length >= 5;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const idempotencyKey = crypto.randomUUID();

    try {
      await reversalMutation.mutateAsync({
        payload: {
          reference: transaction.reference,
          reason: reason.trim()
        },
        idempotencyKey
      });
      onClose();
      setReason('');
      setError('');
    } catch (err) {
      // Error handled by mutation
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Confirm Transaction Reversal" size="md">
      <form onSubmit={handleSubmit} className="space-y-5">
        
        <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-200">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Reference:</span>
            <span className="font-mono font-semibold text-slate-900">{transaction?.reference}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Amount:</span>
            <span className="font-bold text-slate-900">₦{transaction?.amount_naira}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Action:</span>
            <span className="font-bold text-red-600">FULL REVERSAL</span>
          </div>
        </div>

        <Input
          label="Reversal Reason (Required)"
          placeholder="e.g., Provider failed to deliver, manual refund"
          value={reason}
          onChange={(e) => { setReason(e.target.value); if(error) setError(''); }}
          error={error}
          required
        />

        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-3 items-start">
          <span className="text-red-600 text-lg">🚨</span>
          <p className="text-xs text-red-800 leading-relaxed">
            This will reverse the wallet transaction and update the purchase/deposit log status to <strong>'reversed'</strong>. The user will be notified.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} disabled={reversalMutation.isPending}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="danger" 
            loading={reversalMutation.isPending}
            disabled={!isFormValid || reversalMutation.isPending}
          >
            Confirm Reversal
          </Button>
        </div>
      </form>
    </Modal>
  );
}