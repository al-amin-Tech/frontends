import { FormProvider } from 'react-hook-form';

/**
 * Production-grade Form wrapper.
 *
 * Responsibilities:
 * - Provides React Hook Form context
 * - Wraps the native <form>
 * - Applies consistent defaults
 * - Prevents browser validation
 * - Provides consistent spacing
 *
 * Usage:
 *
 * const methods = useForm({...});
 *
 * <Form
 *    methods={methods}
 *    onSubmit={submit}
 * >
 *    ...
 * </Form>
 */

export default function Form({
  methods,
  onSubmit,
  children,
  className = 'space-y-5',
  noValidate = true,
}) {
  return (
    <FormProvider {...methods}>
      <form
        noValidate={noValidate}
        className={className}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
}