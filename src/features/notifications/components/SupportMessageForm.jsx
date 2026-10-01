// src/features/notifications/components/SupportMessageForm.jsx

import {
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import {
  Button,
  Textarea,
} from "../../../shared/components/ui";

const schema = z.object({
  message: z
    .string()
    .trim()
    .min(
      10,
      "Message must be at least 10 characters."
    )
    .max(
      1000,
      "Message cannot exceed 1000 characters."
    ),
});

export default function SupportMessageForm({
  mutation,
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {
      errors,
    },
  } = useForm({
    resolver:
      zodResolver(schema),

    defaultValues: {
      message: "",
    },
  });

  const message =
    watch("message") || "";

  const submit = async (
    values
  ) => {
    await onSubmit?.(values);

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-6"
    >
      <div>

        <label className="mb-2 block font-medium">

          Message

        </label>

        <Textarea
          rows={6}
          placeholder="
Describe your issue, suggestion,
or feedback..."
          {...register("message")}
        />

        {errors.message && (
          <p className="mt-2 text-sm text-red-600">
            {errors.message.message}
          </p>
        )}

        <div className="mt-2 text-right text-xs text-gray-500">

          {message.length}/1000

        </div>

      </div>

      <Button
        type="submit"
        fullWidth
        loading={
          mutation?.isPending
        }
        disabled={
          mutation?.isPending
        }
      >
        Send Message
      </Button>

    </form>
  );
}