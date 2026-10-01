export const API_AUTH_DOCUMENTATION = {
  key: {
    title: "API Key",

    shortDescription:
      "The simplest way to authenticate your API requests.",

    description:
      "API Key authentication uses a unique key assigned to your account. You include the key with your API requests so the system can identify your API account.",

    howItWorks: [
      "Generate an API key from this dashboard.",
      "Store the API key securely in your backend application.",
      "Include the API key when making requests to the VTU API.",
      "The API validates the key and identifies your API account.",
    ],

    bestFor:
      "Simple server-to-server integrations where you want straightforward API authentication.",

    security:
      "Never expose your API key in frontend applications, mobile apps, public repositories, or client-side JavaScript.",

    credentials: [
      "API Key",
    ],
  },

  key_secret: {
    title: "API Key + Secret",

    shortDescription:
      "Authenticate requests using both an API key and a private API secret.",

    description:
      "This authentication method uses two credentials. The API key identifies your account while the API secret provides an additional private credential.",

    howItWorks: [
      "Generate an API key and API secret.",
      "Store both credentials securely on your backend server.",
      "Use the API key to identify your API account.",
      "Use the API secret when the API endpoint requires secret-based authentication.",
    ],

    bestFor:
      "Backend integrations that require an additional secret beyond the API key.",

    security:
      "The API secret must remain private. Never expose it in browser code, mobile applications, public repositories, or screenshots.",

    credentials: [
      "API Key",
      "API Secret",
    ],
  },

  signature: {
    title: "Signature",

    shortDescription:
      "Authenticate requests by signing them with your API secret.",

    description:
      "Signature authentication provides stronger request verification by using your API credentials to generate a signature for API requests.",

    howItWorks: [
      "Generate your API key and API secret.",
      "Store both credentials securely on your backend server.",
      "Create the required request signature using the API secret.",
      "Send the API key and generated signature with the API request.",
      "The API verifies the signature before processing the request.",
    ],

    bestFor:
      "Production integrations where request authenticity and stronger API security are important.",

    security:
      "Your API secret must remain strictly private. Signature authentication should be implemented on your backend server, never directly in browser or mobile client code.",

    credentials: [
      "API Key",
      "API Secret",
      "Request Signature",
    ],
  },
};