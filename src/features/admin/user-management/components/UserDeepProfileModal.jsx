// src/features/admin/user-management/components/UserDeepProfileModal.jsx
// TODO: Adjust paths to match your exact project structure

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { adminUserApi } from '../api/adminUserApi';
import { useBlockUser, useUnBlockUser, useRestoreUser } from '../hooks/useUserActions';

// Reusable UI Components
import { 
  Modal, Card, Button, Badge, Table, Skeleton, Alert 
} from '../../../../shared/components/ui'; // TODO: Adjust path

// Local Sub-Components
import ReasonModal from './ReasonModal';
import StatBox from './StatBox';
import WalletAdjustmentModal from './WalletAdjustmentModal';
import TransactionDetailModal from './TransactionDetailModal';

const PAGE_SIZE = 15;

export default function UserDeepProfileModal({ open, onClose, userUuid }) {
  const queryClient = useQueryClient();
  
  // --- 1. Tab & Pagination State (Isolated per tab) ---
  const [activeTab, setActiveTab] = useState('overview');
  const [purchasePage, setPurchasePage] = useState(1);
  const [depositPage, setDepositPage] = useState(1);
  const [transactionPage, setTransactionPage] = useState(1);
  
  // --- 2. Action Modal States ---
  const [reasonModalState, setReasonModalState] = useState({ isOpen: false, action: null });
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  
  // --- 3. Deep Detail Modal State (Handles purchase, deposit, AND wallet transaction) ---
  const [detailModalState, setDetailModalState] = useState({ 
    isOpen: false, 
    type: null, // 'purchase' | 'deposit' | 'transaction'
    reference: null 
  });

  // --- 4. Data Fetching: Profile ---
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['adminUserDetails', userUuid],
    queryFn: () => adminUserApi.getUserDetails(userUuid),
    enabled: open && !!userUuid,
  });

  // --- 5. Data Fetching: Purchases (Paginated) ---
  const { data: purchases, isLoading: isPurchasesLoading } = useQuery({
    queryKey: ['adminUserPurchases', userUuid, purchasePage],
    queryFn: () => adminUserApi.getPurchases(userUuid, { 
      limit: PAGE_SIZE, 
      offset: (purchasePage - 1) * PAGE_SIZE 
    }),
    enabled: open && !!userUuid && activeTab === 'purchases',
  });

  // --- 6. Data Fetching: Deposits (Paginated) ---
  const { data: deposits, isLoading: isDepositsLoading } = useQuery({
    queryKey: ['adminUserDeposits', userUuid, depositPage],
    queryFn: () => adminUserApi.getDeposits(userUuid, { 
      limit: PAGE_SIZE, 
      offset: (depositPage - 1) * PAGE_SIZE 
    }),
    enabled: open && !!userUuid && activeTab === 'deposits',
  });

  // --- 7. Data Fetching: Wallet Transactions (Paginated - NEW) ---
  const { data: walletTransactions, isLoading: isTransactionsLoading } = useQuery({
    queryKey: ['adminUserTransactions', userUuid, transactionPage],
    queryFn: () => adminUserApi.getUserTransactions(userUuid, { 
      limit: PAGE_SIZE, 
      offset: (transactionPage - 1) * PAGE_SIZE 
    }),
    enabled: open && !!userUuid && activeTab === 'transactions',
  });
  
  // --- 8. Deep Detail Fetching (Lazy - only fires when modal opens) ---
  const { data: purchaseDetail, isLoading: isPurchaseDetailLoading } = useQuery({
    queryKey: ['adminPurchaseDetail', detailModalState.reference],
    queryFn: () => adminUserApi.getPurchaseDetail(detailModalState.reference),
    enabled: detailModalState.isOpen && detailModalState.type === 'purchase' && !!detailModalState.reference,
  });
  

  const { data: depositDetail, isLoading: isDepositDetailLoading } = useQuery({
    queryKey: ['adminDepositDetail', detailModalState.reference],
    queryFn: () => adminUserApi.getDepositDetail(detailModalState.reference),
    enabled: detailModalState.isOpen && detailModalState.type === 'deposit' && !!detailModalState.reference,
  });

  const { data: transactionDetail, isLoading: isTransactionDetailLoading } = useQuery({
    queryKey: ['adminTransactionDetail', detailModalState.reference],
    queryFn: () => adminUserApi.getTransactionDetail(detailModalState.reference),
    enabled: detailModalState.isOpen && detailModalState.type === 'transaction' && !!detailModalState.reference,
  });

  // --- 9. Mutations ---
  const blockMutation = useBlockUser();
  const unblockMutation = useUnBlockUser();
  const restoreMutation = useRestoreUser();

  // --- 10. Action Handlers ---
  const initiateAction = (action) => setReasonModalState({ isOpen: true, action });

  const handleReasonSubmit = async (reason) => {
    const { action } = reasonModalState;
    const payload = { uuid: userUuid, reason };

    try {
      if (action === 'restore') await restoreMutation.mutateAsync(payload);
      else if (action === 'block') await blockMutation.mutateAsync({ ...payload, data: { isBlocked: true, reason } });
      else if (action === 'unblock') await unblockMutation.mutateAsync({ ...payload, data: { isBlocked: false, reason } });

      await Alert({ type: 'success', title: 'Success', message: 'User status updated successfully.' });
      queryClient.invalidateQueries(['adminUserDetails', userUuid]);
      queryClient.invalidateQueries(['adminUsers']);
      onClose();
    } catch (error) {
      await Alert({ type: 'error', title: 'Error', message: error?.response?.data?.message || 'Failed to update user.' });
    }
    setReasonModalState({ isOpen: false, action: null });
  };

  const handleViewDetail = (type, reference) => {
    setDetailModalState({ isOpen: true, type, reference });
  };

  // --- 11. Tab Switching with Pagination Reset ---
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset pagination when switching tabs to prevent stale data confusion
    if (tab === 'purchases') setPurchasePage(1);
    if (tab === 'deposits') setDepositPage(1);
    if (tab === 'transactions') setTransactionPage(1);
  };

  // --- 12. Table Column Definitions ---
  
  // Purchases Columns
  const purchaseColumns = [
    { key: 'reference', title: 'Reference', render: (row) => <span className="font-mono text-xs text-gray-600">{row.reference}</span> },
    { key: 'category', title: 'Category', render: (row) => <Badge variant="info" size="sm">{row.category}</Badge> },
    { key: 'amount', title: 'Amount', render: (row) => <span className="font-semibold">₦{row.amount_naira}</span> },
    { key: 'status', title: 'Status', render: (row) => <Badge variant={row.status === 'success' ? 'success' : 'danger'} size="sm">{row.status}</Badge> },
    { key: 'created_at', title: 'Date', render: (row) => new Date(row.created_at).toLocaleString() },
    { 
      key: 'actions', title: 'Actions', cellClassName: "text-right",
      render: (row) => (
        <Button variant="ghost" size="sm" onClick={() => handleViewDetail('purchase', row.uuid)}>
          View
        </Button>
      )
    }
  ];

  // Deposits Columns
  const depositColumns = [
    { key: 'internal_reference', title: 'Reference', render: (row) => <span className="font-mono text-xs text-gray-600">{row.internal_reference}</span> },
    { key: 'provider', title: 'Provider', render: (row) => row.provider_slug },
    { key: 'amount', title: 'Amount', render: (row) => <span className="font-semibold">₦{row.amount_naira}</span> },
    { key: 'status', title: 'Status', render: (row) => <Badge variant={row.status === 'completed' ? 'success' : row.status === 'pending' ? 'warning' : 'danger'} size="sm">{row.status}</Badge> },
    { key: 'created_at', title: 'Date', render: (row) => new Date(row.created_at).toLocaleString() },
    { 
      key: 'actions', title: 'Actions', cellClassName: "text-right",
      render: (row) => (
        <Button variant="ghost" size="sm" onClick={() => handleViewDetail('deposit', row.internal_reference)}>
          View
        </Button>
      )
    }
  ];

  // Wallet Transactions Columns (NEW)
  const transactionColumns = [
    { key: 'reference', title: 'Reference', render: (row) => <span className="font-mono text-xs text-gray-600">{row.reference}</span> },
    { key: 'category', title: 'Category', render: (row) => <Badge variant="info" size="sm">{row.category}</Badge> },
    { 
      key: 'amount', title: 'Amount', 
      render: (row) => (
        <span className={`font-semibold ${row.transaction_type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
          {row.transaction_type === 'credit' ? '+' : '-'}₦{row.amount_naira}
        </span>
      )
    },
    { key: 'description', title: 'Description', render: (row) => <span className="text-xs text-gray-600 max-w-[200px] truncate block">{row.description || '-'}</span> },
    { key: 'created_at', title: 'Date', render: (row) => new Date(row.created_at).toLocaleString() },
    { 
      key: 'actions', title: 'Actions', cellClassName: "text-right",
      render: (row) => (
        <Button variant="ghost" size="sm" onClick={() => handleViewDetail('transaction', row.uuid)}>
          View
        </Button>
      )
    }
  ];

  // --- 13. Pagination Helper ---
  const PaginationControls = ({ currentPage, dataLength, onPageChange, isLoading }) => (
    <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 bg-slate-50/50">
      <p className="text-sm text-gray-500">
        Showing <span className="font-semibold text-gray-900">{dataLength}</span> records
      </p>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" disabled={currentPage === 1 || isLoading} onClick={() => onPageChange(p => p - 1)}>
          Previous
        </Button>
        <Button variant="secondary" size="sm" disabled={dataLength < PAGE_SIZE || isLoading} onClick={() => onPageChange(p => p + 1)}>
          Next
        </Button>
      </div>
    </div>
  );

  const userData = profile?.data;

  return (
    <>
      <Modal open={open} onClose={onClose} title="User Deep Profile" size="xl">
        {isProfileLoading ? (
          <div className="space-y-4 p-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : userData ? (
          <div className="space-y-6">
            
            {/* --- Header Info --- */}
            <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{userData.full_name}</h2>
                <p className="text-sm text-gray-500 mt-1">{userData.email} • {userData.phone}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant={userData.role === 'agent' ? 'warning' : 'primary'}>{userData.role.toUpperCase()}</Badge>
                  <Badge variant={userData.kyc_status === 'verified' ? 'success' : 'warning'}>{userData.kyc_status.toUpperCase()} KYC</Badge>
                  {userData.is_blocked === 1 && <Badge variant="danger">BLOCKED</Badge>}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary" size="sm" onClick={() => setIsAdjustModalOpen(true)}>Adjust Wallet</Button>
                
                {userData.deleted_at ? (
                  <Button variant="success" size="sm" loading={restoreMutation.isPending} onClick={() => initiateAction('restore')}>Restore User</Button>
                ) : (
                  userData.is_blocked === 1 ? (
                    <Button variant="success" size="sm" loading={unblockMutation.isPending} onClick={() => initiateAction('unblock')}>Unblock User</Button>
                  ) : (
                    <Button variant="danger" size="sm" loading={blockMutation.isPending} onClick={() => initiateAction('block')}>Block User</Button>
                  )
                )}
              </div>
            </div>

            {/* --- Tabs --- */}
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {['overview', 'purchases', 'deposits', 'transactions'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-4 py-2.5 text-sm font-semibold capitalize border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab 
                      ? 'border-indigo-600 text-indigo-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* --- Tab Content --- */}
            <div className="min-h-[300px]">
              
              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  <StatBox label="Current Balance" value={`₦${userData.current_wallet_balance_naira}`} />
                  <StatBox label="Total Deposited" value={`₦${userData.total_deposited_naira}`} />
                  <StatBox label="Total Spent" value={`₦${userData.total_spent_naira}`} />
                  <StatBox label="Deposit Profit" value={`₦${userData.total_deposite_profit_naira}`} highlight />
                  <StatBox label="Purchase Profit" value={`₦${userData.total_purchase_profit_naira}`} highlight />
                  <StatBox label="Referral Commission" value={`₦${userData.total_commission_earned_naira}`} />
                  <StatBox label="Qualified Referrals" value={userData.total_qualified_referrals} />
                  <StatBox label="Commission Balance" value={`₦${userData.total_commission_balance_naira}`} />
                </div>
              )}

              {/* PURCHASES TAB (Paginated) */}
              {activeTab === 'purchases' && (
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <Table 
                    columns={purchaseColumns} 
                    data={purchases?.data || []} 
                    loading={isPurchasesLoading} 
                    emptyMessage="No purchase history found."
                    rowKey="reference"
                    className="border-0"
                  />
                  <PaginationControls 
                    currentPage={purchasePage}
                    dataLength={purchases?.data?.length || 0}
                    onPageChange={setPurchasePage}
                    isLoading={isPurchasesLoading}
                  />
                </div>
              )}

              {/* DEPOSITS TAB (Paginated) */}
              {activeTab === 'deposits' && (
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <Table 
                    columns={depositColumns} 
                    data={deposits?.data || []} 
                    loading={isDepositsLoading} 
                    emptyMessage="No deposit history found."
                    rowKey="internal_reference"
                    className="border-0"
                  />
                  <PaginationControls 
                    currentPage={depositPage}
                    dataLength={deposits?.data?.length || 0}
                    onPageChange={setDepositPage}
                    isLoading={isDepositsLoading}
                  />
                </div>
              )}

              {/* WALLET TRANSACTIONS TAB (Paginated - NEW) */}
              {activeTab === 'transactions' && (
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <Table 
                    columns={transactionColumns} 
                    data={walletTransactions?.data || []} 
                    loading={isTransactionsLoading} 
                    emptyMessage="No wallet transactions found."
                    rowKey="uuid"
                    className="border-0"
                  />
                  <PaginationControls 
                    currentPage={transactionPage}
                    dataLength={walletTransactions?.data?.length || 0}
                    onPageChange={setTransactionPage}
                    isLoading={isTransactionsLoading}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">Failed to load user profile.</p>
        )}
      </Modal>

      {/* --- Nested Modals --- */}
      
      {/* 1. Reason Prompt for Block/Unblock/Restore */}
      <ReasonModal 
        open={reasonModalState.isOpen}
        onClose={() => setReasonModalState({ isOpen: false, action: null })}
        title="Confirm Administrative Action"
        actionName={reasonModalState.action === 'restore' ? 'Restoration' : reasonModalState.action === 'block' ? 'Blocking' : 'Unblocking'}
        onSubmit={handleReasonSubmit}
        isLoading={blockMutation.isPending || unblockMutation.isPending || restoreMutation.isPending}
      />

      {/* 2. Wallet Adjustment */}
      <WalletAdjustmentModal 
        open={isAdjustModalOpen} 
        onClose={() => setIsAdjustModalOpen(false)} 
        user={userData} 
      />

      {/* 3. Unified Deep Detail Modal (Handles all 3 types) */}
      <TransactionDetailModal
        open={detailModalState.isOpen}
        onClose={() => setDetailModalState({ isOpen: false, type: null, reference: null, uuid: null })}
        type={detailModalState.type}
        data={
          detailModalState.type === 'purchase' ? purchaseDetail?.data :
          detailModalState.type === 'deposit' ? depositDetail?.data :
          detailModalState.type === 'transaction' ? transactionDetail?.data : null
        }
        isLoading={
          detailModalState.type === 'purchase' ? isPurchaseDetailLoading :
          detailModalState.type === 'deposit' ? isDepositDetailLoading :
          detailModalState.type === 'transaction' ? isTransactionDetailLoading : false
        }
      />
    </>
  );
}