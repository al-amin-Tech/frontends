// src/features/settings/pages/HelpSupportPage.jsx

import {
  AlertCircle,
  Loader2,
} from "lucide-react";

import {
  Alert,
  Card,
} from "../../../shared/components/ui";

import ContactCard from "../components/ContactCard";

import {
  SUPPORT_CONTACTS,
  DEVELOPER_CONTACTS,
  FEEDBACK_ITEM,
} from "../constants/contactItems";


import { buildContactHref } from "../utils/contactHelpers";

import { useSupportLinks } from "../hooks/useSupportLinks";


export default function HelpSupportPage() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useSupportLinks();

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
              Unable to load support information
            </h2>

            <p className="text-sm text-gray-500">
              Please try again.
            </p>

          </div>

        </div>

        <button
          onClick={refetch}
          className="text-blue-600 font-medium"
        >
          Retry
        </button>

      </Card>
    );
  }

  const support = data?.support ?? {};

  const developer = data?.developer ?? {};

  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-24">

      {/* Header */}

      <div>

        <h1 className="text-2xl font-bold">
          Help & Support
        </h1>

        <p className="mt-2 text-gray-500">
          Need assistance? Contact our support team
          through any of the channels below.
        </p>

      </div>

      {/* Customer Support */}

      <section className="space-y-4">

        <h2 className="text-lg font-semibold">
          Customer Support
        </h2>

        {SUPPORT_CONTACTS.map((item) => (

          <ContactCard
            key={item.key}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            value={support[item.key]}
            href={buildContactHref(
              item.type,
              support[item.key]
            )}
            disabled={!support[item.key]}
          />

        ))}

      </section>

      {/* Developer */}

      <section className="space-y-4">

        <h2 className="text-lg font-semibold">
          Developer
        </h2>

        {DEVELOPER_CONTACTS.map((item) => (

          <ContactCard
            key={item.key}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            value={developer[item.key]}
            href={buildContactHref(
              item.type,
              developer[item.key]
            )}
            disabled={!developer[item.key]}
          />

        ))}

      </section>

      {/* Feedback */}

      <section className="space-y-4">

        <h2 className="text-lg font-semibold">
          Feedback
        </h2>

        <ContactCard
          title={FEEDBACK_ITEM.title}
          subtitle={FEEDBACK_ITEM.subtitle}
          icon={FEEDBACK_ITEM.icon}
          disabled
        />

      </section>

    </div>
  );
}

