import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_AUTH_BASE_URL || Bun.env.VITE_AUTH_BASE_URL,
  plugins: [adminClient()],
});

export default authClient;
