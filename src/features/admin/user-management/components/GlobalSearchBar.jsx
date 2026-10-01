// src/features/admin/user-management/components/GlobalSearchBar.jsx
// TODO: Adjust paths
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminUserApi } from '../api/adminUserApi';
import { Card, Input, Button, Badge, Modal, Alert } from '../../../../shared/components/ui';
import { Search } from 'lucide-react';
import TransactionReversalModal from './TransactionReversalModal';
import { useGlobalSearch } from '../hooks/useGlobalSearch';

export default function GlobalSearchBar() {
  const [reference, setReference] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isReversalModalOpen, setIsReversalModalOpen] = useState(false);
  const [isFullDataVisible, setIsFullDataVisible] = useState(false);

  const searchMutation = useGlobalSearch();

  // Fetch full details when a reference is found
  const { data: detailData, isLoading: isDetailLoading } = useQuery({
    queryKey: [
      'adminTransactionDetail',
      searchResult?.type,
      searchResult?.uuid || searchResult?.internal_reference,
    ],
    queryFn: () => {
      if (searchResult?.type === 'purchase') {
        return adminUserApi.getPurchaseDetail(searchResult.uuid);
      }

      return adminUserApi.getDepositDetail(searchResult.uuid);
    },
    enabled: isDetailModalOpen && !!searchResult,
  });

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!reference.trim()) return;

    try {
      const response = await searchMutation.mutateAsync(reference);

      setSearchResult(response.data);
      setIsFullDataVisible(false);
      setIsDetailModalOpen(true);
    } catch (error) {
      await Alert({
        type: 'error',
        title: 'Search Failed',
        message:
          error?.response?.data?.message ||
          'No transaction found with that reference.',
      });

      setSearchResult(null);
    }
  };

  const transactionForReversal = detailData?.data
    ? {
        reference:
          searchResult?.type === 'purchase'
            ? detailData.data.reference
            : detailData.data.internal_reference,

        amount_naira:
          searchResult?.type === 'purchase'
            ? detailData.data.user_pays_naira
            : detailData.data.gross_amount_naira,

        type: searchResult?.type,
        status: detailData.data.status,
      }
    : null;

  /**
   * Fields already displayed in the normal transaction view.
   * Everything else will be shown when "View" is clicked.
   */
  const displayedFields = new Set([
    'id',
    'uuid',
    'reference',
    'internal_reference',
    'actor_type',
    'user_id',
    'api_user_id',
    'category',
    'network',
    'recipient',
    'plan_type',
    'user_entered_amount_naira',
    'user_pays_naira',
    'gross_amount_naira',
    'status',
    'created_at',
    'metadata',
  ]);

  const remainingTransactionData = detailData?.data
    ? Object.fromEntries(
        Object.entries(detailData.data).filter(
          ([key]) => !displayedFields.has(key)
        )
      )
    : {};

  return (
    <>
      <Card className="p-6 mb-6 border-l-4 border-l-indigo-500">
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-4 sm:flex-row sm:items-end"
        >
          <div className="flex-1">
            <Input
              label="Global Transaction Search"
              placeholder="Enter transaction reference (e.g., TXN-12345)"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              leftIcon={<Search size={18} />}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="sm:h-[50px]"
            loading={searchMutation.isPending}
          >
            Search
          </Button>
        </form>
      </Card>

      {/* Transaction Detail & Action Modal */}
      <Modal
        open={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setIsFullDataVisible(false);
        }}
        title="Transaction Investigation"
        size="lg"
      >
        {isDetailLoading ? (
          <div className="p-8 text-center text-gray-500">
            Loading transaction details...
          </div>
        ) : detailData?.data ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">
                  Transaction Type
                </p>

                <p className="text-lg font-bold text-gray-900 capitalize">
                  {searchResult?.type}
                </p>
              </div>

              <Badge
                variant={
                  detailData.data.status === 'success' ||
                  detailData.data.status === 'completed'
                    ? 'success'
                    : 'warning'
                }
                size="lg"
              >
                {detailData.data.status.toUpperCase()}
              </Badge>
            </div>

            {/* Normal Transaction Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
              {/* Reference */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  Reference
                </p>

                <p className="font-mono text-sm font-medium text-gray-900 break-all mt-1">
                  {searchResult?.type === 'purchase'
                    ? detailData.data.reference
                    : detailData.data.internal_reference}
                </p>
              </div>

              {/* Actor Type */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  Actor Type
                </p>

                <p className="text-sm font-medium text-gray-900 mt-1 capitalize">
                  {detailData.data.actor_type || '-'}
                </p>
              </div>

              {/* User ID */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  User ID
                </p>

                <p className="text-sm font-medium text-gray-900 mt-1">
                  {detailData.data.user_id ?? '-'}
                </p>
              </div>

              {/* API User ID */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  API User ID
                </p>

                <p className="text-sm font-medium text-gray-900 mt-1">
                  {detailData.data.api_user_id ?? '-'}
                </p>
              </div>

              {/* Category */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  Category
                </p>

                <p className="text-sm font-medium text-gray-900 mt-1 capitalize">
                  {detailData.data.category || '-'}
                </p>
              </div>

              {/* Network */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  Network
                </p>

                <p className="text-sm font-medium text-gray-900 mt-1 uppercase">
                  {detailData.data.network || '-'}
                </p>
              </div>

              {/* Recipient */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  Recipient
                </p>

                <p className="font-mono text-sm font-medium text-gray-900 mt-1">
                  {detailData.data.recipient || '-'}
                </p>
              </div>

              {/* Plan Type */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  Plan Type
                </p>

                <p className="text-sm font-medium text-gray-900 mt-1">
                  {detailData.data.plan_type || '-'}
                </p>
              </div>

              {/* User Entered Amount */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  User Entered Amount
                </p>

                <p className="text-lg font-bold text-gray-900 mt-1">
                  ₦{detailData.data.user_entered_amount_naira ?? '-'}
                </p>
              </div>

              {/* User Pays */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  User Pays
                </p>

                <p className="text-lg font-bold text-indigo-600 mt-1">
                  ₦
                  {searchResult?.type === 'purchase'
                    ? detailData.data.user_pays_naira
                    : detailData.data.gross_amount_naira}
                </p>
              </div>

              {/* Date */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  Date
                </p>

                <p className="text-sm font-medium text-gray-900 mt-1">
                  {detailData.data.created_at
                    ? new Date(detailData.data.created_at).toLocaleString()
                    : '-'}
                </p>
              </div>
            </div>

            {/* View Remaining Data */}
            <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-center">
                <Button
                  variant="secondary"
                  onClick={() =>
                    setIsFullDataVisible((current) => !current)
                  }
                >
                  {isFullDataVisible ? 'Hide' : 'View'}
                </Button>
              </div>

              {isFullDataVisible && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    Additional Transaction Data
                  </p>

                  <pre className="text-xs bg-slate-900 text-slate-300 p-4 rounded-lg overflow-x-auto font-mono max-h-[400px] overflow-y-auto">
                    {JSON.stringify(
                      {
                        ...remainingTransactionData,
                        metadata: detailData.data.metadata,
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsDetailModalOpen(false);
                  setIsFullDataVisible(false);
                }}
              >
                Close
              </Button>

              {/* Reversal Button */}
              {(detailData.data.status === 'processing' ||
                detailData.data.status === 'submitted') && (
                <Button
                  variant="danger"
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    setIsReversalModalOpen(true);
                  }}
                >
                  Reverse Transaction
                </Button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">
            No details available.
          </p>
        )}
      </Modal>

      {/* Reversal Confirmation Modal */}
      <TransactionReversalModal
        open={isReversalModalOpen}
        onClose={() => {
          setIsReversalModalOpen(false);
        }}
        transaction={transactionForReversal}
      />
    </>
  );
}


