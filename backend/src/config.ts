import "dotenv/config";

export interface AppConfig {
  port: number;
  jwtSecret: string;
  clientOrigins: string[];
  trustProxy: number;
}

export function loadConfig(): AppConfig {
  const isProduction = process.env.NODE_ENV === "production";
  const port = Number(process.env.PORT ?? 5001);
  const jwtSecret = process.env.JWT_SECRET;
  const databaseUrl = process.env.DATABASE_URL;
  const clientOrigins = (
    process.env.CLIENT_ORIGINS ?? (isProduction ? "" : "http://localhost:5173")
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be a valid TCP port number.");
  }

  if (!jwtSecret || Buffer.byteLength(jwtSecret, "utf8") < 32) {
    throw new Error("JWT_SECRET must contain at least 32 bytes of random data.");
  }

  if (!databaseUrl) {
    throw new Error("DATABASE_URL must be set.");
  }

  if (!clientOrigins.length) {
    throw new Error("CLIENT_ORIGINS must contain at least one allowed origin.");
  }

  for (const origin of clientOrigins) {
    let parsedOrigin: URL;
    try {
      parsedOrigin = new URL(origin);
    } catch (error) {
      throw new Error(`Invalid client origin: ${origin}`, { cause: error });
    }

     // URL() accepts protocols like ftp: and file:, so explicitly allow only HTTP(S).
    if (
      (parsedOrigin.protocol !== "http:" && parsedOrigin.protocol !== "https:") ||
      parsedOrigin.origin !== origin ||
      (isProduction && parsedOrigin.protocol !== "https:")
    ) {
      throw new Error(
        `CLIENT_ORIGINS entry must be a valid${isProduction ? " HTTPS" : ""} origin.`,
      );
    }
  }

  let parsedDatabaseUrl: URL;
  try {
    parsedDatabaseUrl = new URL(databaseUrl);
  } catch (error) {
    throw new Error("DATABASE_URL must be a valid PostgreSQL connection URL.", { cause: error });
  }
  if (!["postgres:", "postgresql:"].includes(parsedDatabaseUrl.protocol)) {
    throw new Error("DATABASE_URL must use the PostgreSQL protocol.");
  }

  const trustProxy = Number(process.env.TRUST_PROXY ?? 0);
  if (!Number.isInteger(trustProxy) || trustProxy < 0) {
    throw new Error("TRUST_PROXY must be a non-negative proxy hop count.");
  }

  return { port, jwtSecret, clientOrigins, trustProxy };
}
