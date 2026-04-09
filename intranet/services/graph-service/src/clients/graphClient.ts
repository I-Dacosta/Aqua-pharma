import { ClientSecretCredential } from "@azure/identity";

import { loadPlatformConfig } from "@platform/config";

const config = loadPlatformConfig();

function buildGraphScopes() {
  return ["https://graph.microsoft.com/.default"];
}

function buildServerCredential() {
  const tenantId = config.ENTRA_TENANT_ID;
  const clientId = config.ENTRA_CLIENT_ID;
  const clientSecret = config.ENTRA_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error(
      "ENTRA_CLIENT_SECRET, ENTRA_CLIENT_ID, and ENTRA_TENANT_ID are required for confidential Graph access.",
    );
  }

  return new ClientSecretCredential(tenantId, clientId, clientSecret);
}

export async function getAppOnlyAccessToken() {
  const credential = buildServerCredential();
  const token = await credential.getToken(buildGraphScopes());

  if (!token?.token) {
    throw new Error("Failed to acquire an app-only Microsoft Graph access token.");
  }

  return token.token;
}
