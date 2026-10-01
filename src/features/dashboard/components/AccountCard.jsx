import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function AccountCard({ account }) {
  const {
    account_number: accountNumber,
    account_name: accountName,
    bank_name: bankName,
    charge,
    fee_type,
  } = account ?? {};

  const [copied, setCopied] = useState(false);

  const copyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      className="
        rounded-2xl
        bg-white
        p-3
        shadow
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">Reserved Account</p>
          <h2 className="mt-1 text-lg font-bold tracking-wider">{accountNumber}</h2>
          <p className="mt-1 text-sm font-semibold">{accountName}</p>
          <p className="text-gray-500">{bankName}</p>
        </div>

        <div className="text-right">
          {/* Updated Charge Logic */}
          {charge != null && charge !== "" && (
            <p className="text-sm font-semibold">
              {fee_type?.toLowerCase() === "percentage" 
                ? `${charge}% Charge` 
                : `₦${charge} Charge`
              }
            </p>
          )}

          <button
            onClick={copyAccountNumber}
            className="
              mt-2
              inline-flex
              items-center
              gap-1
              rounded-lg
              bg-blue-600
              px-2
              py-1
              text-sm
              text-white
            "
          >
            {copied ? (
              <>
                <Check size={12} />
                Copied
              </>
            ) : (
              <>
                <Copy size={10} />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}









/*




// src/features/dashboard/components/AccountCard.jsx

import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function AccountCard({
  account,}) {
  const {
  account_number: accountNumber,
  account_name: accountName,
  bank_name: bankName,
  charge,
  fee_type,
} = account ?? {};



  const [copied, setCopied] = useState(false);

  const copyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      className="
        rounded-2xl
        bg-white
        p-3
        shadow
      "
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-gray-500">
            Reserved Account
          </p>

          <h2 className="mt-1 text-lg font-bold tracking-wider">
            {accountNumber}
          </h2>

          <p className="mt-1 text-sm font-semibold">
            {accountName}
          </p>

          <p className="text-gray-500">
            {bankName}
          </p>

        </div>

        <div className="text-right">

          {charge && (
            <p className="text-sm font-semibold">
              ₦{charge} Charge
            </p>
          )}

          <button
            onClick={copyAccountNumber}
            className="
              mt-2
              inline-flex
              items-center
              gap-1
              rounded-lg
              bg-blue-600
              px-2
              py-1
              text-sm
              text-white
            "
          >
            {copied ? (
              <>
                <Check size={12} />
                Copied
              </>
            ) : (
              <>
                <Copy size={10} />
                Copy
              </>
            )}
          </button>

        </div>

      </div>
    </section>
  );
}

*/