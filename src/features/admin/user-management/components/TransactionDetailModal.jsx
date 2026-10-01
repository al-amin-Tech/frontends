// src/features/admin/user-management/components/TransactionDetailModal.jsx
// TODO: Adjust paths
import { Modal, Card, Skeleton, Badge } from '../../../../shared/components/ui';

export default function TransactionDetailModal({
  open,
  onClose,
  type,
  data,
  isLoading,
}) {
  /**
   * Render a single investigation field.
   *
   * Values are intentionally rendered through an allowlisted UI rather
   * than blindly dumping the entire API response into the primary view.
   */
  const renderRow = (
    label,
    value,
    {
      isCurrency = false,
      isHighlight = false,
      mono = false,
      allowZero = true,
    } = {}
  ) => {
    const hasValue =
      value !== null &&
      value !== undefined &&
      value !== '' &&
      (allowZero || value !== 0);

    return (
      <div className="flex flex-col gap-1 py-3 border-b border-gray-100 last:border-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <span className="text-sm text-gray-500 shrink-0">{label}</span>

        <span
          className={[
            'text-sm font-semibold text-right break-all',
            isHighlight ? 'text-indigo-700' : 'text-gray-900',
            mono || isCurrency ? 'font-mono' : '',
          ].join(' ')}
        >
          {isCurrency && hasValue
            ? `₦${value}`
            : hasValue
              ? String(value)
              : '-'}
        </span>
      </div>
    );
  };

  const formatDate = (value) => {
    if (!value) return '-';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return String(value);
    }

    return date.toLocaleString();
  };

  const getStatusVariant = () => {
    if (!data?.status) return 'gray';

    const status = String(data.status).toLowerCase();

    if (['success', 'completed'].includes(status)) {
      return 'success';
    }

    if (['pending', 'processing', 'submitted'].includes(status)) {
      return 'warning';
    }

    if (
      ['failed', 'reversed', 'cancelled', 'declined'].includes(status)
    ) {
      return 'danger';
    }

    return 'gray';
  };

  const getTitle = () => {
    switch (type) {
      case 'transaction':
        return 'Wallet Transaction Details';

      case 'deposit':
        return 'Deposit Transaction Details';

      case 'purchase':
        return 'Purchase Transaction Details';

      default:
        return 'Transaction Details';
    }
  };

  /**
   * Transaction-specific additional data.
   *
   * These are intentionally selected fields rather than:
   *
   * JSON.stringify(data)
   *
   * This keeps the investigation UI predictable and prevents future
   * backend fields from being automatically exposed.
   */
  const getAdditionalData = () => {
    if (!data) return null;

    switch (type) {
      case 'transaction':
        return {
          wallet_id: data.wallet_id,
          related_transaction_id: data.related_transaction_id,
          metadata: data.metadata,
        };

      case 'deposit':
        return {
          provider_reference: data.provider_reference,
          merchant_reference: data.merchant_reference,
          account_type: data.account_type,
          provider_fee_naira: data.provider_fee_naira,
          net_credit_naira: data.net_credit_naira,
          profit_naira: data.profit_naira,
          provider_response: data.provider_response,
          raw_payload: data.raw_payload,
        };

      case 'purchase':
        return {
          plan_id: data.plan_id,
          provider_plan_id: data.provider_plan_id,
          provider_reference: data.provider_reference,
          provider_transaction_id: data.provider_transaction_id,
          api_user_reference: data.api_user_reference,
          quantity_forwarded: data.quantity_forwarded,
          provider_amount_naira: data.provider_amount_naira,
          provider_state: data.provider_state,
          provider_request: data.provider_request,
          provider_response: data.provider_response,
          metadata: data.metadata,
          updated_at: data.updated_at,
        };

      default:
        return null;
    }
  };

  const additionalData = getAdditionalData();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={getTitle()}
      size="md"
    >
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ) : data ? (
        <div className="space-y-5">
          {/* Status Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Transaction Type
              </p>

              <p className="text-sm font-semibold text-gray-900 mt-1 capitalize">
                {type === 'transaction' ? 'Wallet Transaction' : type}
              </p>
            </div>

            <Badge variant={getStatusVariant()} size="md">
              {data.status?.toUpperCase() || 'UNKNOWN'}
            </Badge>
          </div>

          {/* =========================================================
              WALLET TRANSACTION
              ========================================================= */}
          {type === 'transaction' && (
            <Card className="p-4 bg-slate-50 border-slate-100">
              <div>
                {renderRow('Transaction ID', data.id)}

                {renderRow('Transaction UUID', data.uuid, {
                  mono: true,
                })}

                {renderRow('Reference', data.reference, {
                  mono: true,
                })}

                {renderRow('Wallet ID', data.wallet_id)}

                {renderRow('User ID', data.user_id)}

                {renderRow('Type', data.type?.toUpperCase())}

                {renderRow('Category', data.category)}

                {renderRow('Description', data.description)}

                {/* Amount */}
                <div className="flex flex-col gap-1 py-3 border-b border-gray-100 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <span className="text-sm text-gray-500">
                    Amount
                  </span>

                  <span
                    className={[
                      'text-sm font-bold font-mono',
                      data.type === 'credit'
                        ? 'text-green-700'
                        : 'text-red-700',
                    ].join(' ')}
                  >
                    {data.type === 'credit' ? '+' : '-'}
                    ₦{data.amount_naira ?? '-'}
                  </span>
                </div>

                {renderRow(
                  'Opening Balance',
                  data.opening_balance_naira,
                  {
                    isCurrency: true,
                  }
                )}

                {renderRow(
                  'Closing Balance',
                  data.closing_balance_naira,
                  {
                    isCurrency: true,
                    isHighlight: true,
                  }
                )}

                {renderRow('Created At', formatDate(data.created_at))}
              </div>
            </Card>
          )}

          {/* =========================================================
              DEPOSIT
              ========================================================= */}
          {type === 'deposit' && (
            <Card className="p-4 bg-slate-50 border-slate-100">
              <div>
                {renderRow('Deposit ID', data.id)}

                {renderRow(
                  'Internal Reference',
                  data.internal_reference,
                  {
                    mono: true,
                  }
                )}

                {renderRow(
                  'Provider Reference',
                  data.provider_reference,
                  {
                    mono: true,
                  }
                )}

                {renderRow(
                  'Merchant Reference',
                  data.merchant_reference,
                  {
                    mono: true,
                  }
                )}

                {renderRow('User ID', data.user_id)}

                {renderRow('Provider', data.provider_slug)}

                {renderRow('Account Type', data.account_type)}

                {renderRow('Account Number', data.account_number, {
                  mono: true,
                })}

                {renderRow(
                  'Gross Amount',
                  data.gross_amount_naira,
                  {
                    isCurrency: true,
                    isHighlight: true,
                  }
                )}

                {renderRow(
                  'Net Credit',
                  data.net_credit_naira,
                  {
                    isCurrency: true,
                  }
                )}

                {renderRow(
                  'Provider Fee',
                  data.provider_fee_naira,
                  {
                    isCurrency: true,
                  }
                )}

                {renderRow(
                  'System Fee',
                  data.system_fee_naira,
                  {
                    isCurrency: true,
                  }
                )}

                {renderRow(
                  'Profit',
                  data.profit_naira,
                  {
                    isCurrency: true,
                  }
                )}

                {renderRow('Created At', formatDate(data.created_at))}

                {renderRow('Updated At', formatDate(data.updated_at))}
              </div>
            </Card>
          )}

          {/* =========================================================
              PURCHASE
              ========================================================= */}
          {type === 'purchase' && (
            <Card className="p-4 bg-slate-50 border-slate-100">
              <div>
                {renderRow('Purchase ID', data.id)}

                {renderRow('Reference', data.reference, {
                  mono: true,
                })}

                {renderRow('Actor Type', data.actor_type)}

                {renderRow('User ID', data.user_id)}

                {renderRow('API User ID', data.api_user_id)}

                {renderRow('Category', data.category)}

                {renderRow('Network', data.network)}

                {renderRow('Plan Type', data.plan_type)}

                {renderRow('Recipient', data.recipient, {
                  mono: true,
                })}

                {renderRow(
                  'Quantity',
                  data.quantity_forwarded
                )}

                {renderRow(
                  'User Entered Amount',
                  data.user_entered_amount_naira,
                  {
                    isCurrency: true,
                  }
                )}

                {renderRow(
                  'User Pays',
                  data.user_pays_naira,
                  {
                    isCurrency: true,
                    isHighlight: true,
                  }
                )}

                {renderRow(
                  'Provider Cost',
                  data.provider_cost_naira,
                  {
                    isCurrency: true,
                  }
                )}

                {renderRow(
                  'Provider Amount',
                  data.provider_amount_naira,
                  {
                    isCurrency: true,
                  }
                )}

                {renderRow(
                  'Platform Profit',
                  data.profit_naira,
                  {
                    isCurrency: true,
                    isHighlight: true,
                  }
                )}

                {renderRow(
                  'Provider State',
                  data.provider_state
                )}

                {renderRow('Created At', formatDate(data.created_at))}

                {renderRow('Updated At', formatDate(data.updated_at))}
              </div>
            </Card>
          )}

          {/* =========================================================
              CONTROLLED ADDITIONAL DATA
              ========================================================= */}
          {additionalData && (
            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Additional Transaction Data
              </p>

              <pre className="text-xs bg-slate-900 text-slate-300 p-3 rounded-lg overflow-x-auto font-mono max-h-64 overflow-y-auto whitespace-pre-wrap break-words">
                {JSON.stringify(additionalData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-4">
          No details available.
        </p>
      )}
    </Modal>
  );
}














/*
// src/features/admin/user-management/components/TransactionDetailModal.jsx

import { Modal, Card, Skeleton, Badge } from '../../../../shared/components/ui'; // TODO: Adjust path

export default function TransactionDetailModal({ open, onClose, type, data, isLoading }) {
  const renderRow = (label, value, isCurrency = false, isHighlight = false) => (
    <div className="flex justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm font-semibold ${isHighlight ? 'text-indigo-700' : 'text-gray-900'} ${isCurrency ? 'font-mono' : ''}`}>
        {isCurrency && value !== null && value !== undefined ? `₦${value}` : (value || '-')}
      </span>
    </div>
  );

  const getStatusVariant = () => {
    if (!data?.status) return 'gray';
    const s = data.status.toLowerCase();
    if (['success', 'completed'].includes(s)) return 'success';
    if (['pending', 'processing'].includes(s)) return 'warning';
    if (['failed', 'reversed', 'cancelled'].includes(s)) return 'danger';
    return 'gray';
  };

  return (
    <Modal open={open} onClose={onClose} title={`${type === 'transaction' ? 'Wallet' : type?.charAt(0).toUpperCase() + type?.slice(1)} Transaction Details`} size="md">
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ) : data ? (
        <div className="space-y-4">
          
          {/* Status Header *}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-500">Status</span>
            <Badge variant={getStatusVariant()} size="md">{data.status?.toUpperCase()}</Badge>
          </div>

          {/* Main Details Card *}
          <Card className="p-4 bg-slate-50 border-slate-100">
            
            {/* Common Fields *}
            {type === 'purchase' && renderRow('Reference', data.reference)}
            {type === 'deposit' && renderRow('Reference', data.internal_reference)}
            {type === 'transaction' && renderRow('Transaction UUID', data.uuid)}
            {type === 'transaction' && renderRow('Reference', data.reference)}
            
            {/* Amount Fields *}
            {type === 'purchase' && renderRow('User Pays', data.user_pays_naira, true, true)}
            {type === 'deposit' && renderRow('Gross Amount', data.gross_amount_naira, true, true)}
            {type === 'transaction' && (
              <>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Amount</span>
                  <span className={`text-sm font-bold font-mono ${data.transaction_type === 'credit' ? 'text-green-700' : 'text-red-700'}`}>
                    {data.transaction_type === 'credit' ? '+' : '-'}₦{data.amount_naira}
                  </span>
                </div>
                {renderRow('Opening Balance', data.opening_balance_naira, true)}
                {renderRow('Closing Balance', data.closing_balance_naira, true, true)}
                {renderRow('Transaction Type', data.transaction_type?.toUpperCase())}
              </>
            )}

            {/* Category & Description *}
            {type !== 'transaction' && renderRow('Category', data.category)}
            {type === 'purchase' && renderRow('Network', data.network || 'N/A')}
            {type === 'transaction' && renderRow('Category', data.category)}
            {type === 'transaction' && data.description && renderRow('Description', data.description)}

            {/* Provider Info *}
            {type === 'purchase' && renderRow('Provider Cost', data.provider_cost_naira, true)}
            {type === 'purchase' && data.profit_naira && renderRow('Platform Profit', data.profit_naira, true, true)}
            {type === 'deposit' && renderRow('Provider', data.provider_slug)}
            {type === 'deposit' && renderRow('Account Number', data.account_number)}
            {type === 'deposit' && data.system_fee_naira && renderRow('System Fee', data.system_fee_naira, true)}

            {/* Date *}
            {renderRow('Date', new Date(data.created_at).toLocaleString())}
          </Card>

          {/* Metadata / Provider Response *}
          {data.metadata && (
            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Provider Response / Metadata</p>
              <pre className="text-xs bg-slate-900 text-slate-300 p-3 rounded-lg overflow-x-auto font-mono max-h-48">
                {JSON.stringify(data.metadata, null, 2)}
              </pre>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-4">No details available.</p>
      )}
    </Modal>
  );
}

*/
