// src/features/settings/components/ThemeSettingsForm.jsx
import { Check } from "lucide-react";

import {
  Card,
} from "../../../shared/components/ui";

import {
  THEME_OPTIONS,
} from "../../../shared/theme/themes";

import {
  useTheme,
} from "../../../shared/theme/useTheme";

export default function ThemeSettingsForm() {
  const {
    theme,
    setTheme,
  } = useTheme();

  return (
    <div className="space-y-4">

      {THEME_OPTIONS.map((option) => {
        const active =
          theme === option.id;

        return (
          <Card
            key={option.id}
            onClick={() =>
              setTheme(option.id)
            }
            className={`
            cursor-pointer
            transition
            hover:border-blue-500
            ${active ? "border-blue-600" : ""}    `}   
            >
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <div>

                <h3 className="font-semibold">
                  {option.title}
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  {option.description}
                </p>

              </div>

              {active && (
                <Check
                  size={22}
                  className="text-blue-600"
                />
              )}

            </div>
          </Card>
        );
      })}

    </div>
  );
}