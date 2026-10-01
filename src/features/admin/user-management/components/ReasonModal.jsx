// src/features/admin/user-management/components/ReasonModal.jsx
import { useState } from 'react';
import { Modal, Button, Input } from '../../../../shared/components/ui'; // TODO: Adjust path

export default function ReasonModal({ open, onClose, title, actionName, onSubmit, isLoading }) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim() || reason.trim().length < 5) {
      setError('A detailed reason (min 5 chars) is required for audit purposes.');
      return;
    }
    onSubmit(reason);
  };

  return (
    <Modal open={open} onClose={onClose} title={title} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label={`Reason for ${actionName}`}
          placeholder={`Please explain why you are ${actionName.toLowerCase()} this user...`}
          value={reason}
          onChange={(e) => { setReason(e.target.value); if (error) setError(''); }}
          error={error}
          required
        />
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button type="submit" variant="danger" loading={isLoading}>Confirm {actionName}</Button>
        </div>
      </form>
    </Modal>
  );
}