import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: process.env.BASE_URL,
  plugins: [adminClient()],
});

export default authClient;
