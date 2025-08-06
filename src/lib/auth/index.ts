import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { reactStartCookies } from "better-auth/react-start";
import { db } from "../db";

export const auth = betterAuth({
  baseURL: import.meta.env.VITE_BASE_URL,
  secret: import.meta.env.VITE_AUTH_SECRET,
  database: drizzleAdapter(db(), {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "",
      clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET ?? "",
    },
  },
  plugins: [admin(), reactStartCookies()],
});
