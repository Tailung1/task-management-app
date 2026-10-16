const isProduction = process.env.NODE_ENV === "production";

const clientOrigins =
  process.env.ORIGINS ??
  (isProduction ? "" : "http://localhost:5001")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
