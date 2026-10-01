// src/features/settings/components/LegalDocumentCard.jsx
/*

import {
  ChevronRight,
} from "lucide-react";

import {
  Card,
} from "../../../shared/components/ui";

export default function LegalDocumentCard({
  title,
  description,
  url,
}) {
  const handleClick = () => {
    if (!url) return;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Card
      className={`
        transition
        ${
          url
            ? "cursor-pointer hover:border-blue-500"
            : "opacity-60 cursor-not-allowed"
        }
      `}
      onClick={handleClick}
    >
      <div className="flex items-center">

        <div className="flex-1">

          <h3 className="font-semibold">
            {title}
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            {description}
          </p>

        </div>

        {url && (
          <ChevronRight
            size={20}
            className="text-gray-400"
          />
        )}

      </div>
    </Card>
  );
}




*/

import { ChevronRight } from "lucide-react";
import { Card } from "../../../shared/components/ui";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function LegalDocumentCard({
  title,
  description,
  url,
}) {
  const handleClick = () => {
    if (!url) return;

    const documentUrl = url.startsWith("http")
      ? url
      : `${API_URL}${url}`;
      
      
    window.open(
      documentUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Card
      className={`
        transition
        ${
          url
            ? "cursor-pointer hover:border-blue-500"
            : "cursor-not-allowed opacity-60"
        }
      `}
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div className="flex-1">
          <h3 className="font-semibold">
            {title}
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>

        {url && (
          <ChevronRight
            size={20}
            className="text-gray-400"
          />
        )}
      </div>
    </Card>
  );
}
