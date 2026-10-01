// src/features/referral/components/ReferralCountdown.jsx

import {
  useEffect,
  useState,
} from "react";

function getRemaining(expiry) {
  const target = new Date(expiry).getTime();
  const now = Date.now();

  const diff = target - now;

  if (diff <= 0) {
    return null;
  }

  const days = Math.floor(
    diff / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (diff % (1000 * 60 * 60)) /
      (1000 * 60)
  );

  return {
    days,
    hours,
    minutes,
  };
}

export default function ReferralCountdown({
  expiry,
}) {
  const [remaining, setRemaining] =
    useState(() =>
      getRemaining(expiry)
    );

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(
        getRemaining(expiry)
      );
    }, 60000);

    return () =>
      clearInterval(timer);
  }, [expiry]);

  if (!expiry) {
    return null;
  }

  if (!remaining) {
    return (
      <div className="space-y-1">

        <p className="text-sm font-medium">
          Status
        </p>

        <p className="font-semibold text-red-600">
          Expired
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-1">

      <p className="text-sm font-medium">
        Expires In
      </p>

      <p className="font-semibold text-blue-600">

        {remaining.days}d{" "}

        {remaining.hours}h{" "}

        {remaining.minutes}m

      </p>

    </div>
  );
}