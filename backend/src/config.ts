import "dotenv/config";

export interface AppConfig {
  port: number;
  jwtSecret: string;
  clientOrigins: string[];
  trustProxy: number;
  appUrl: string;
  smtp:
    | {
        host: string;
        port: number;
        user: string;
        password: string;
        from: string;
      }
    | undefined;
}

export function loadConfig(): AppConfig {
  const isProduction = process.env.NODE_ENV === "production";
  const port = Number(process.env.PORT ?? 5001);
  const jwtSecret = process.env.JWT_SECRET;
  const databaseUrl = process.env.DATABASE_URL;
  const appUrl = process.env.APP_URL ?? (isProduction ? "" : "http://localhost:5173");
  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpPort = Number(process.env.SMTP_PORT ?? 465);
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPassword = process.env.SMTP_PASSWORD;
  const smtpFrom = process.env.SMTP_FROM?.trim();
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

  let parsedAppUrl: URL;
  try {
    parsedAppUrl = new URL(appUrl);
  } catch (error) {
    throw new Error("APP_URL must be a valid HTTP(S) origin.", { cause: error });
  }
  if (
    (parsedAppUrl.protocol !== "http:" && parsedAppUrl.protocol !== "https:") ||
    parsedAppUrl.origin !== appUrl ||
    (isProduction && parsedAppUrl.protocol !== "https:")
  ) {
    throw new Error(`APP_URL must be a valid${isProduction ? " HTTPS" : ""} origin.`);
  }

  const hasSmtpConfiguration = [smtpHost, smtpUser, smtpPassword, smtpFrom].some(Boolean);
  const hasCompleteSmtpConfiguration =
    !!smtpHost && !!smtpUser && !!smtpPassword && !!smtpFrom;

  if (isProduction && !hasCompleteSmtpConfiguration) {
    throw new Error("SMTP_HOST, SMTP_USER, SMTP_PASSWORD, and SMTP_FROM must be set in production.");
  }
  if (hasSmtpConfiguration && !hasCompleteSmtpConfiguration) {
    throw new Error("SMTP_HOST, SMTP_USER, SMTP_PASSWORD, and SMTP_FROM must all be set.");
  }
  if (
    hasCompleteSmtpConfiguration &&
    (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535)
  ) {
    throw new Error("SMTP_PORT must be a valid TCP port number.");
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

     // URL() accepts protocols like ftp: and file: as well, so explicitly allow only HTTP(S).
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

  return {
    port,
    jwtSecret,
    clientOrigins,
    trustProxy,
    appUrl,
    smtp: hasCompleteSmtpConfiguration
      ? {
          host: smtpHost,
          port: smtpPort,
          user: smtpUser,
          password: smtpPassword,
          from: smtpFrom,
        }
      : undefined,
  };
}
