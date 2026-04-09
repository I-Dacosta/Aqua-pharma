import { ClientSecretCredential, DefaultAzureCredential } from "@azure/identity";

type ServerAuthConfig = {
  ENTRA_TENANT_ID: string;
  ENTRA_CLIENT_ID: string;
  ENTRA_CLIENT_SECRET?: string;
};

export function buildGraphScopes() {
  return ["https://graph.microsoft.com/.default"];
}

export function buildServerCredential(config: ServerAuthConfig) {
  if (config.ENTRA_CLIENT_SECRET) {
    return new ClientSecretCredential(
      config.ENTRA_TENANT_ID,
      config.ENTRA_CLIENT_ID,
      config.ENTRA_CLIENT_SECRET,
    );
  }

  return new DefaultAzureCredential();
}
