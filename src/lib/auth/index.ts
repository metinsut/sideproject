import { betterAuth } from "better-auth";
import { type DB, drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "../db";

function createAuth() {
  // Use runtime environment variables (Bun.env or process.env)
  // import.meta.env is build-time only and won't work in Docker runtime
  const baseURL = Bun.env.VITE_BASE_URL || import.meta.env.VITE_BASE_URL;
  const secret = Bun.env.VITE_AUTH_SECRET || import.meta.env.VITE_AUTH_SECRET;
  const googleClientId = Bun.env.VITE_GOOGLE_CLIENT_ID || import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const googleClientSecret =
    Bun.env.VITE_GOOGLE_CLIENT_SECRET || import.meta.env.VITE_GOOGLE_CLIENT_SECRET;

  console.log(Bun.env.VITE_BASE_URL);
  console.log(import.meta.env.VITE_BASE_URL);
  console.log(process.env.VITE_BASE_URL);
  console.log(Bun.env.BASE_URL);
  console.log({ baseURL, secret, googleClientId, googleClientSecret });

  if (!baseURL) {
    throw new Error("VITE_BASE_URL is missing at runtime");
  }

  if (!secret) {
    throw new Error("VITE_AUTH_SECRET is missing at runtime");
  }

  if (!googleClientId) {
    throw new Error("VITE_GOOGLE_CLIENT_ID is missing at runtime");
  }

  if (!googleClientSecret) {
    throw new Error("VITE_GOOGLE_CLIENT_SECRET is missing at runtime");
  }

  return betterAuth({
    baseURL,
    secret,
    database: drizzleAdapter(db() as DB, {
      provider: "pg",
    }),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: googleClientId,
        clientSecret: googleClientSecret,
      },
    },
    plugins: [admin(), tanstackStartCookies()],
    trustedOrigins: [
      baseURL,
      "http://localhost:8080",
      "https://sideproject-i2nf4.ondigitalocean.app",
    ],
  });
}

export const auth = createAuth();
