"use client";

import { startTransition, useEffect, useState } from "react";

import { SignedIn, SignedOut, usePortalAuth } from "@platform/auth";

type UserProfile = {
  displayName: string;
  id: string;
  mail?: string;
  userPrincipalName?: string;
};

type SiteResult = {
  id: string;
  name: string;
  webUrl?: string;
};

type CustomerRecord = {
  id: string;
  name: string;
  tenant: string;
  siteId: string;
  driveId: string;
  createdAt: string;
};

const graphServiceUrl = process.env.NEXT_PUBLIC_GRAPH_SERVICE_URL ?? "http://localhost:4001";
const customerServiceUrl = process.env.NEXT_PUBLIC_CUSTOMER_SERVICE_URL ?? "http://localhost:4002";

async function requestJson<T>(url: string, accessToken: string, init: RequestInit = {}) {
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return (await response.json()) as T;
}

export function InternalPortalHome() {
  const { account, getAccessToken, isAuthenticated, login, logout, ready } = usePortalAuth();
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [siteName, setSiteName] = useState("");
  const [siteResults, setSiteResults] = useState<SiteResult[]>([]);
  const [selectedSiteId, setSelectedSiteId] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");

  const refreshData = async () => {
    setIsBusy(true);
    setError(null);

    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return;
      }

      const [me, allCustomers] = await Promise.all([
        requestJson<UserProfile>(`${graphServiceUrl}/me`, accessToken),
        requestJson<CustomerRecord[]>(`${customerServiceUrl}/customers`, accessToken),
      ]);

      setProfile(me);
      setCustomers(allCustomers);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Failed to load portal data");
    } finally {
      setIsBusy(false);
    }
  };

  useEffect(() => {
    if (ready && isAuthenticated) {
      startTransition(() => {
        void refreshData();
      });
    }
  }, [isAuthenticated, ready]);

  const handleSearchSites = async () => {
    setIsBusy(true);
    setError(null);

    try {
      const accessToken = await getAccessToken();
      if (!accessToken || !siteName.trim()) {
        return;
      }

      const result = await requestJson<{ value: SiteResult[] }>(
        `${graphServiceUrl}/sites/search?query=${encodeURIComponent(siteName.trim())}`,
        accessToken,
      );

      setSiteResults(result.value);
      setSelectedSiteId(result.value[0]?.id ?? "");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Failed to search SharePoint sites");
    } finally {
      setIsBusy(false);
    }
  };

  const handleCreateCustomer = async () => {
    setIsBusy(true);
    setError(null);

    try {
      const accessToken = await getAccessToken();
      if (!accessToken || !workspaceName.trim() || !selectedSiteId) {
        return;
      }

      await requestJson(`${customerServiceUrl}/customers`, accessToken, {
        method: "POST",
        body: JSON.stringify({
          name: workspaceName.trim(),
          siteId: selectedSiteId,
        }),
      });

      setWorkspaceName("");
      await refreshData();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Failed to create customer workspace");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#d8f2ff,transparent_35%),linear-gradient(180deg,#f6fbff_0%,#edf3f6_100%)] px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <SignedOut>
          <section className="grid gap-8 rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-sky-700">Intranett</p>
              <h1 className="mt-5 max-w-xl text-5xl font-semibold tracking-tight text-slate-950">
                Provision customer SharePoint workspaces through backend Graph access.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Sign in with Microsoft Entra ID for user identity, then let the backend confidential client search
                tenant sites, register customer workspaces in PostgreSQL, and hand off drive metadata to the
                document pipeline.
              </p>
              <button
                className="mt-8 rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white"
                onClick={() => void login()}
                type="button"
              >
                Sign in with Entra ID
              </button>
            </div>
            <div className="rounded-[1.75rem] border border-sky-100 bg-sky-50/80 p-6">
              <p className="text-sm font-semibold text-sky-800">Authentication model</p>
              <ul className="mt-4 grid gap-3 text-sm text-slate-700">
                <li>The browser requests only user identity scopes for sign-in and profile context.</li>
                <li>The graph-service uses `ENTRA_CLIENT_SECRET` to acquire app-only Microsoft Graph tokens.</li>
                <li>SharePoint site discovery and document operations now run from the backend confidential client.</li>
              </ul>
            </div>
          </section>
        </SignedOut>

        <SignedIn>
          <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-sky-700">Internal Portal</p>
                  <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
                    Customer workspace provisioning
                  </h1>
                </div>
                <button
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
                  onClick={() => void logout()}
                  type="button"
                >
                  Sign out
                </button>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Signed in as</p>
                  <p className="mt-3 text-xl font-semibold text-slate-950">{profile?.displayName ?? account?.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{profile?.mail ?? profile?.userPrincipalName ?? account?.username}</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Provisioned customers</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950">{customers.length}</p>
                  <p className="mt-1 text-sm text-slate-600">Backed by Prisma and PostgreSQL</p>
                </div>
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-semibold text-slate-950">Find SharePoint site</h2>
                <div className="mt-4 flex gap-3">
                  <input
                    className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                    onChange={(event) => setSiteName(event.target.value)}
                    placeholder="Search for an existing customer site"
                    value={siteName}
                  />
                  <button
                    className="rounded-full bg-sky-700 px-5 py-3 text-sm font-medium text-white"
                    disabled={isBusy}
                    onClick={() => void handleSearchSites()}
                    type="button"
                  >
                    Search
                  </button>
                </div>

                <div className="mt-5 grid gap-3">
                  {siteResults.map((site) => (
                    <label
                      className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 p-4"
                      key={site.id}
                    >
                      <input
                        checked={selectedSiteId === site.id}
                        name="selected-site"
                        onChange={() => setSelectedSiteId(site.id)}
                        type="radio"
                      />
                      <div>
                        <p className="font-medium text-slate-950">{site.name}</p>
                        <p className="text-sm text-slate-500">{site.webUrl ?? site.id}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-semibold text-slate-950">Register customer workspace</h2>
                <div className="mt-4 flex flex-col gap-3 md:flex-row">
                  <input
                    className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                    onChange={(event) => setWorkspaceName(event.target.value)}
                    placeholder="Customer display name"
                    value={workspaceName}
                  />
                  <button
                    className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white"
                    disabled={isBusy || !selectedSiteId}
                    onClick={() => void handleCreateCustomer()}
                    type="button"
                  >
                    Create record
                  </button>
                </div>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-950">Customer registry</h2>
                <button
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
                  onClick={() => void refreshData()}
                  type="button"
                >
                  Refresh
                </button>
              </div>
              {error ? <p className="mt-4 text-sm text-rose-700">{error}</p> : null}
              <div className="mt-5 grid gap-3">
                {customers.map((customer) => (
                  <div className="rounded-2xl border border-slate-200 p-4" key={customer.id}>
                    <p className="font-medium text-slate-950">{customer.name}</p>
                    <p className="mt-1 text-sm text-slate-500">Site ID: {customer.siteId}</p>
                    <p className="mt-1 text-sm text-slate-500">Drive ID: {customer.driveId}</p>
                  </div>
                ))}
                {!customers.length && !isBusy ? (
                  <p className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                    No customer workspaces stored yet.
                  </p>
                ) : null}
              </div>
            </aside>
          </section>
        </SignedIn>
      </div>
    </main>
  );
}