// src/shared/api/errorHandler.js
export class ApiError extends Error {
  constructor(
    message,
    status = null,
    code = null,
    data = null,
    originalError = null
  ) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.data = data;
    this.originalError = originalError;
  }

  is(code) {
    return this.code === code;
  }
}

export const normalizeApiError = (error) => {
  if (error instanceof ApiError) {
    return error;
  }

  if (!error.response) {
    return new ApiError(
      error.message || "Network error",
      null,
      error.code || "NETWORK_ERROR",
      null,
      error
    );
  }

  const { status, data } = error.response;

  return new ApiError(
    data?.message ||
      data?.error ||
      data?.detail ||
      "Something went wrong",
    status,
    data?.code || null,
    data,
    error
  );
};








