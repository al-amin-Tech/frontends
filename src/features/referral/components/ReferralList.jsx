// src/features/referral/components/ReferralList.jsx

import ReferralCard from "./ReferralCard";

export default function ReferralList({
  referrals = [],
}) {
  return (
    <section className="space-y-4">

      <div>

        <h2 className="text-xl font-bold">
          Referral History
        </h2>

        <p className="text-sm text-gray-500">
          All invited users and their
          referral progress.
        </p>

      </div>

      {referrals.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
          No referrals yet.
        </div>
      ) : (
        <div className="space-y-4">
          {referrals.map((referral, index) => (
            <ReferralCard
              key={
                referral?.user ??
                index
              }
              referral={referral}
            />
          ))}
        </div>
      )}

    </section>
  );
}