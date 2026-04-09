import path from "node:path";

import { config as loadDotEnv } from "dotenv";
import { z } from "zod";

loadDotEnv({ quiet: true });
loadDotEnv({ path: path.resolve(process.cwd(), ".env"), quiet: true });
loadDotEnv({ path: path.resolve(process.cwd(), "../../.env"), quiet: true });

const platformConfigSchema = z.object({
  API_GATEWAY_PORT: z.coerce.number().default(4000),
  GRAPH_SERVICE_PORT: z.coerce.number().default(4001),
  CUSTOMER_SERVICE_PORT: z.coerce.number().default(4002),
  DOCUMENT_SERVICE_PORT: z.coerce.number().default(4003),
  GRAPH_SERVICE_URL: z.string().url().default("http://localhost:4001"),
  CUSTOMER_SERVICE_URL: z.string().url().default("http://localhost:4002"),
  DOCUMENT_SERVICE_URL: z.string().url().default("http://localhost:4003"),
  ENTRA_TENANT_ID: z.string().default("7797083b-78a3-41a0-8094-98bc772423be"),
  ENTRA_CLIENT_ID: z.string().default("b73ebc2c-6176-4974-a486-da789c7ab544"),
  ENTRA_CLIENT_SECRET: z.string().optional(),
  ENTRA_REDIRECT_URI: z.string().url().default("http://localhost:3000/api/auth/callback"),
  ENTRA_POST_LOGOUT_REDIRECT_URI: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_ENTRA_CLIENT_ID: z.string().default("b73ebc2c-6176-4974-a486-da789c7ab544"),
  NEXT_PUBLIC_ENTRA_TENANT_ID: z.string().default("7797083b-78a3-41a0-8094-98bc772423be"),
  NEXT_PUBLIC_ENTRA_CALLBACK_PATH: z.string().default("/api/auth/callback"),
  NEXT_PUBLIC_GRAPH_SERVICE_URL: z.string().url().default("http://localhost:4001"),
  NEXT_PUBLIC_CUSTOMER_SERVICE_URL: z.string().url().default("http://localhost:4002"),
  NEXT_PUBLIC_DOCUMENT_SERVICE_URL: z.string().url().default("http://localhost:4003"),
  DATABASE_URL: z.string().default("postgresql://postgres:postgres@localhost:5432/platform"),
});

export type PlatformConfig = z.infer<typeof platformConfigSchema>;

export function loadPlatformConfig(env: NodeJS.ProcessEnv = process.env): PlatformConfig {
  return platformConfigSchema.parse(env);
}
