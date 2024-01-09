export const backendApiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://ipangram-api.onrender.com";
