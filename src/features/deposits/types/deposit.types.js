/**
 * @typedef {"reserved" | "card" | "static"} DepositMethod
 */

/**
 * @typedef {
 *   "ACCOUNT_DETAILS" |
 *   "GENERATE_ACCOUNT_NUMBER" |
 *   "ENTER_AMOUNT_THEN_REDIRECT"
 * } DepositUIState
 */

/**
 * @typedef {
 *   "VIEW_ACCOUNT_DETAILS" |
 *   "GENERATE_ACCOUNT_NUMBER" |
 *   "ENTER_AMOUNT"
 * } DepositActionType
 */

/**
 * @typedef {Object} DepositAction
 * @property {DepositActionType} type
 * @property {string} label
 * @property {boolean} [redirect]
 */

/**
 * @typedef {Object} DepositAccount
 * @property {string} accountId
 * @property {string} bankName
 * @property {string} accountNumber
 * @property {string} accountName
 * @property {string|null} reference
 * @property {string} status
 * @property {string|null} createdAt
 */

/**
 * NOTE:
 * The current backend service converts these values to Naira strings.
 *
 * @typedef {Object} DepositFee
 * @property {string} feeConfigId
 * @property {"fixed"|"percentage"} feeType
 * @property {string} feeValue
 * @property {string} threshold
 * @property {"fixed"|"percentage"|null} thresholdFeeType
 * @property {string} thresholdFeeValue
 * @property {string} defaultProviderCost
 * @property {number} version
 */

/**
 * @typedef {Object} DepositCard
 * @property {string} providerSlug
 * @property {DepositMethod} method
 * @property {string|null} bankCode
 * @property {string} bankName
 * @property {string} displayName
 * @property {boolean} isReserved
 * @property {boolean} hasAccount
 * @property {DepositUIState} uiState
 * @property {DepositAction} action
 * @property {DepositAccount|null} account
 * @property {DepositFee} fee
 */

/**
 * @typedef {Object} DepositCardsResponse
 * @property {string|null} userId
 * @property {number} count
 * @property {DepositCard[]} cards
 */