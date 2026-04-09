import {
  BrowserCacheLocation,
  type AccountInfo,
  type Configuration,
  type RedirectRequest,
  type SilentRequest,
} from "@azure/msal-browser";

type BrowserAuthConfig = {
  ENTRA_CLIENT_ID: string;
  ENTRA_TENANT_ID: string;
  ENTRA_REDIRECT_URI?: string;
  ENTRA_POST_LOGOUT_REDIRECT_URI?: string;
};

export const GRAPH_USER_SCOPES = [
  "openid",
  "profile",
  "email",
  "offline_access",
  "User.Read",
] as const;

export function resolveRedirectUri(redirectUri?: string) {
  if (redirectUri) {
    return redirectUri;
  }

  if (typeof window === "undefined") {
    return "/api/auth/callback";
  }

  return `${window.location.origin}/api/auth/callback`;
}

export function buildBrowserMsalConfig(config: BrowserAuthConfig): Configuration {
  return {
    auth: {
      clientId: config.ENTRA_CLIENT_ID,
      authority: `https://login.microsoftonline.com/${config.ENTRA_TENANT_ID}`,
      redirectUri: resolveRedirectUri(config.ENTRA_REDIRECT_URI),
      postLogoutRedirectUri:
        config.ENTRA_POST_LOGOUT_REDIRECT_URI ?? (typeof window === "undefined" ? "/" : window.location.origin),
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
  };
}

export function buildLoginRequest(scopes: readonly string[] = GRAPH_USER_SCOPES): RedirectRequest {
  return {
    prompt: "select_account",
    scopes: [...scopes],
  };
}

export function buildTokenRequest(
  account: AccountInfo,
  scopes: readonly string[] = GRAPH_USER_SCOPES,
): SilentRequest {
  return {
    account,
    scopes: [...scopes],
  };
}
