import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: Bun.env.VITE_BASE_URL || import.meta.env.VITE_BASE_URL,
  plugins: [adminClient()],
});

export default authClient;
