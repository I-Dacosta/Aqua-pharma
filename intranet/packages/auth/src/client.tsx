"use client";

import {
  EventType,
  InteractionRequiredAuthError,
  PublicClientApplication,
  type AuthenticationResult,
} from "@azure/msal-browser";
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
  useIsAuthenticated,
  useMsal,
} from "@azure/msal-react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import { buildBrowserMsalConfig, buildLoginRequest, buildTokenRequest, GRAPH_USER_SCOPES } from "./browser.js";

type EntraAuthProviderProps = PropsWithChildren<{
  clientId: string;
  tenantId: string;
  redirectUri?: string;
  postLogoutRedirectUri?: string;
  loginScopes?: readonly string[];
}>;

type AuthContextValue = {
  ready: boolean;
  loginScopes: readonly string[];
  postLogoutRedirectUri?: string;
};

const AuthBootstrapContext = createContext<AuthContextValue>({
  ready: false,
  loginScopes: GRAPH_USER_SCOPES,
});

export function EntraAuthProvider({
  children,
  clientId,
  tenantId,
  redirectUri,
  postLogoutRedirectUri,
  loginScopes = GRAPH_USER_SCOPES,
}: EntraAuthProviderProps) {
  const [instance] = useState(
    () =>
      new PublicClientApplication(
        buildBrowserMsalConfig({
          ENTRA_CLIENT_ID: clientId,
          ENTRA_TENANT_ID: tenantId,
          ENTRA_REDIRECT_URI: redirectUri,
          ENTRA_POST_LOGOUT_REDIRECT_URI: postLogoutRedirectUri,
        }),
      ),
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const callbackId = instance.addEventCallback((event) => {
      if (
        (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
        event.payload
      ) {
        const payload = event.payload as AuthenticationResult;
        if (payload.account) {
          instance.setActiveAccount(payload.account);
        }
      }
    });

    void (async () => {
      try {
        await instance.initialize();
        const result = await instance.handleRedirectPromise();
        const account = result?.account ?? instance.getActiveAccount() ?? instance.getAllAccounts()[0] ?? null;
        if (account) {
          instance.setActiveAccount(account);
        }
      } finally {
        if (mounted) {
          setReady(true);
        }
      }
    })();

    return () => {
      mounted = false;
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance]);

  const value = useMemo<AuthContextValue>(
    () => ({ ready, loginScopes, postLogoutRedirectUri }),
    [loginScopes, postLogoutRedirectUri, ready],
  );

  return (
    <AuthBootstrapContext.Provider value={value}>
      <MsalProvider instance={instance}>{children}</MsalProvider>
    </AuthBootstrapContext.Provider>
  );
}

export function SignedIn({ children }: PropsWithChildren) {
  return <AuthenticatedTemplate>{children}</AuthenticatedTemplate>;
}

export function SignedOut({ children }: PropsWithChildren) {
  return <UnauthenticatedTemplate>{children}</UnauthenticatedTemplate>;
}

export function usePortalAuth() {
  const { instance, accounts } = useMsal();
  const { ready, loginScopes, postLogoutRedirectUri } = useContext(AuthBootstrapContext);
  const isAuthenticated = useIsAuthenticated();
  const account = instance.getActiveAccount() ?? accounts[0] ?? null;

  return {
    account,
    isAuthenticated,
    ready,
    login: async () => instance.loginRedirect(buildLoginRequest(loginScopes)),
    logout: async () =>
      instance.logoutRedirect({
        account: account ?? undefined,
        postLogoutRedirectUri,
      }),
    getAccessToken: async (scopes: readonly string[] = loginScopes) => {
      const activeAccount = instance.getActiveAccount() ?? accounts[0] ?? null;
      if (!activeAccount) {
        await instance.loginRedirect(buildLoginRequest(scopes));
        return "";
      }

      try {
        const result = await instance.acquireTokenSilent(buildTokenRequest(activeAccount, scopes));
        return result.accessToken;
      } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
          await instance.acquireTokenRedirect(buildLoginRequest(scopes));
          return "";
        }

        throw error;
      }
    },
  };
}