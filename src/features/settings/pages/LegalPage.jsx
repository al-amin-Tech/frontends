// src/features/settings/pages/LegalPage.jsx

import {
  AlertCircle,
  Loader2,
} from "lucide-react";

import {
  Card,
} from "../../../shared/components/ui";

import LegalDocumentCard from "../components/LegalDocumentCard";
import { useLegalDocuments } from "../hooks/useLegalDocuments";

export default function LegalPage() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useLegalDocuments();

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2
          size={32}
          className="animate-spin text-blue-600"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="space-y-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-red-500" />

          <div>
            <h2 className="font-semibold">
              Unable to load legal documents
            </h2>

            <p className="text-sm text-gray-500">
              Please try again later.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={refetch}
          className="font-medium text-blue-600"
        >
          Retry
        </button>
      </Card>
    );
  }

  const legal = data ?? {};

  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-24">

      <div>
        <h1 className="text-2xl font-bold">
          Legal
        </h1>

        <p className="mt-2 text-gray-500">
          Read our policies and terms before
          using the application.
        </p>
      </div>

      <div className="space-y-4">

        <LegalDocumentCard
          title="Privacy Policy"
          description="Learn how we collect, use and protect your information."
          url={legal.privacy_policy}
        />

        <LegalDocumentCard
          title="Terms & Conditions"
          description="Read the terms governing the use of this application."
          url={legal.terms}
        />

      </div>
    </div>
  );
}