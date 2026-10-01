// src/features/settings/pages/ThemeSettingsPage.jsx

import {
  Card,
} from "../../../shared/components/ui";

import ThemeSettingsForm
  from "../components/ThemeSettingsForm";




export default function ThemeSettingsPage() {
  return (
    <div
      className="
        mx-auto
        max-w-2xl
        space-y-6
        pb-24
      "
    >
      <div>

        <h1 className="text-2xl font-bold">
          Appearance
        </h1>

        <p
          className="
            mt-2
            text-gray-500
            dark:text-gray-400
          "
        >
          Choose how the application looks.
          Your preference is saved
          automatically.
        </p>

      </div>

      <Card>

        <ThemeSettingsForm />

      </Card>

    </div>
  );
}
