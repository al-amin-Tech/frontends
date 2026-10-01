// src/features/admin/user-management/components/WalletAdjustmentModal.jsx
// TODO: Adjust paths

import { useState, useMemo } from 'react';
import { useWalletAdjustment } from '../hooks/useWalletActions';
import {
  Modal,
  Button,
  Input,
  Select
} from '../../../../shared/components/ui';

export default function WalletAdjustmentModal({
  open,
  onClose,
  user
}) {
  const [direction, setDirection] = useState('credit');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const adjustMutation = useWalletAdjustment();

  // Convert the user's current wallet balance to a number.
  const currentBalance = parseFloat(
    user?.current_wallet_balance_naira?.replace(/,/g, '') || 0
  );

  // Convert the admin-entered amount to a number.
  const adjustmentAmount = parseFloat(amount) || 0;

  // Calculate the projected balance in real time.
  const newBalance = useMemo(() => {
    if (direction === 'credit') {
      return currentBalance + adjustmentAmount;
    }

    return Math.max(0, currentBalance - adjustmentAmount);
  }, [currentBalance, adjustmentAmount, direction]);

  // Form is only valid when:
  // 1. Amount exists
  // 2. Amount is greater than zero
  // 3. Reason has at least 10 characters
  // 4. Verification checkbox is checked
  const isFormValid =
    amount.trim() !== '' &&
    Number.isFinite(adjustmentAmount) &&
    adjustmentAmount > 0 &&
    reason.trim().length >= 10 &&
    isVerified;

  const handleAmountChange = (e) => {
    const value = e.target.value;

    // Allow empty input while typing.
    if (value === '') {
      setAmount('');
      return;
    }

    // Only allow positive numbers.
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }

    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setError('Please enter a valid amount, reason, and complete verification.');
      return;
    }

    const idempotencyKey = crypto.randomUUID();

    try {
      await adjustMutation.mutateAsync({
        payload: {
          targetUserId: user.id,

          // This is the amount entered by the admin.
          amount: adjustmentAmount.toString(),

          direction,

          reason: `[EXTERNAL VERIFIED] ${reason.trim()}`
        },

        idempotencyKey
      });

      // Reset form after successful adjustment.
      setAmount('');
      setReason('');
      setIsVerified(false);
      setDirection('credit');
      setError('');

      onClose();
    } catch (err) {
      // The mutation can handle/display its own API error.
      setError(
        err?.message || 'Unable to complete wallet adjustment.'
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Manual Wallet Adjustment"
      size="md"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Adjustment Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Adjustment Type
          </label>

          <Select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="w-full"
          >
            <option value="credit">
              Credit (Add Funds to User)
            </option>

            <option value="debit">
              Debit (Deduct Funds from User)
            </option>
          </Select>
        </div>

        {/* Adjustment Amount */}
        <Input
          label="Adjustment Amount (₦)"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Enter amount, e.g. 10000"
          value={amount}
          onChange={handleAmountChange}
          error={error && !amount ? 'Amount is required' : undefined}
          required
        />

        {/* User / Balance Information */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-200">

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">
              User:
            </span>

            <span className="font-semibold text-slate-900 text-right">
              {user?.fullName || 'Unknown User'}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">
              Current Balance:
            </span>

            <span className="font-semibold text-slate-900">
              ₦{currentBalance.toLocaleString('en-NG', {
                minimumFractionDigits: 2
              })}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">
              Adjustment Amount:
            </span>

            <span
              className={`font-bold ${
                direction === 'credit'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {direction === 'credit' ? '+' : '-'}
              ₦{adjustmentAmount.toLocaleString('en-NG', {
                minimumFractionDigits: 2
              })}
            </span>
          </div>

          {/* Projected Balance */}
          <div className="border-t-2 border-slate-300 pt-3 flex justify-between items-center">
            <span className="text-sm font-bold text-slate-800">
              Projected New Balance:
            </span>

            <span
              className={`text-2xl font-extrabold ${
                direction === 'credit'
                  ? 'text-green-700'
                  : 'text-red-700'
              }`}
            >
              ₦{newBalance.toLocaleString('en-NG', {
                minimumFractionDigits: 2
              })}
            </span>
          </div>
        </div>

        {/* Audit Reason */}
        <Input
          label="Audit Reason (Min 10 chars)"
          placeholder="e.g., External Bank Ref: 883920. User sent 10k instead of 1m."
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);

            if (error) {
              setError('');
            }
          }}
          required
        />

        {/* Security Verification */}
        <label className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg cursor-pointer hover:bg-amber-100 transition-colors">
          <input
            type="checkbox"
            className="mt-1 w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            checked={isVerified}
            onChange={(e) => setIsVerified(e.target.checked)}
          />

          <span className="text-xs text-amber-900 leading-relaxed font-medium">
            I confirm I have independently verified this external
            bank transfer in our corporate account statement. I
            understand this action will permanently alter the user's
            wallet and is logged in the admin audit trail.
          </span>
        </label>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">

          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={adjustMutation.isPending}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant={
              direction === 'credit'
                ? 'success'
                : 'danger'
            }
            loading={adjustMutation.isPending}
            disabled={
              !isFormValid ||
              adjustMutation.isPending
            }
          >
            Confirm{' '}
            {direction === 'credit'
              ? 'Credit'
              : 'Debit'}
          </Button>

        </div>
      </form>
    </Modal>
  );
}