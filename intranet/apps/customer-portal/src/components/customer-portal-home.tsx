"use client";

import { startTransition, useEffect, useMemo, useState } from "react";

import { SignedIn, SignedOut, usePortalAuth } from "@platform/auth";

type UserProfile = {
  displayName: string;
  id: string;
  mail?: string;
  userPrincipalName?: string;
};

type CustomerRecord = {
  id: string;
  name: string;
  siteId: string;
  driveId: string;
};

type DocumentRecord = {
  id: string;
  name: string;
  path: string;
  createdAt: string;
  size?: number;
  isFolder?: boolean;
};

const graphServiceUrl = process.env.NEXT_PUBLIC_GRAPH_SERVICE_URL ?? "http://localhost:4001";
const customerServiceUrl = process.env.NEXT_PUBLIC_CUSTOMER_SERVICE_URL ?? "http://localhost:4002";
const documentServiceUrl = process.env.NEXT_PUBLIC_DOCUMENT_SERVICE_URL ?? "http://localhost:4003";

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

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}

function encodeBase64(content: string) {
  const bytes = new TextEncoder().encode(content);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

export function CustomerPortalHome() {
  const { account, getAccessToken, isAuthenticated, login, logout, ready } = usePortalAuth();
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [uploadBody, setUploadBody] = useState("Customer portal file created through backend confidential Graph access.");
  const [uploadName, setUploadName] = useState("welcome.txt");

  const selectedCustomer = useMemo(
    () => customers.find((customer) => customer.id === selectedCustomerId) ?? null,
    [customers, selectedCustomerId],
  );

  const refreshCustomers = async () => {
    setIsBusy(true);
    setError(null);

    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return;
      }

      const [me, customerList] = await Promise.all([
        requestJson<UserProfile>(`${graphServiceUrl}/me`, accessToken),
        requestJson<CustomerRecord[]>(`${customerServiceUrl}/customers`, accessToken),
      ]);

      setProfile(me);
      setCustomers(customerList);
      setSelectedCustomerId((current) => current || customerList[0]?.id || "");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Failed to load customer data");
    } finally {
      setIsBusy(false);
    }
  };

  const refreshDocuments = async (customerId: string) => {
    setIsBusy(true);
    setError(null);

    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return;
      }

      const items = await requestJson<DocumentRecord[]>(`${documentServiceUrl}/documents/${customerId}`, accessToken);
      setDocuments(items);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Failed to load SharePoint documents");
    } finally {
      setIsBusy(false);
    }
  };

  useEffect(() => {
    if (ready && isAuthenticated) {
      startTransition(() => {
        void refreshCustomers();
      });
    }
  }, [isAuthenticated, ready]);

  useEffect(() => {
    if (selectedCustomerId) {
      startTransition(() => {
        void refreshDocuments(selectedCustomerId);
      });
    } else {
      setDocuments([]);
    }
  }, [selectedCustomerId]);

  const handleUpload = async () => {
    if (!selectedCustomerId || !uploadName.trim() || !uploadBody.trim()) {
      return;
    }

    setIsBusy(true);
    setError(null);

    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return;
      }

      await requestJson(`${documentServiceUrl}/documents/${selectedCustomerId}`, accessToken, {
        method: "POST",
        body: JSON.stringify({
          name: uploadName.trim(),
          contentBase64: encodeBase64(uploadBody),
        }),
      });

      await refreshDocuments(selectedCustomerId);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Failed to upload document");
    } finally {
      setIsBusy(false);
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!selectedCustomerId) {
      return;
    }

    setIsBusy(true);
    setError(null);

    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return;
      }

      await requestJson(`${documentServiceUrl}/documents/${selectedCustomerId}/${itemId}`, accessToken, {
        method: "DELETE",
      });

      await refreshDocuments(selectedCustomerId);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Failed to delete document");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#ffe6c8,transparent_32%),linear-gradient(180deg,#fff8ef_0%,#f5ecdf_100%)] px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <SignedOut>
          <section className="grid gap-8 rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-700">Customer Portal</p>
              <h1 className="mt-5 max-w-xl text-5xl font-semibold tracking-tight text-slate-950">
                Access SharePoint files through a backend confidential Microsoft Graph client.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Sign in for user identity, then let the backend list documents from the customer workspace, upload
                files, and delete files through the document and Graph services.
              </p>
              <button
                className="mt-8 rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white"
                onClick={() => void login()}
                type="button"
              >
                Sign in with Entra ID
              </button>
            </div>
            <div className="rounded-[1.75rem] border border-amber-100 bg-amber-50/80 p-6">
              <p className="text-sm font-semibold text-amber-800">Connected services</p>
              <ul className="mt-4 grid gap-3 text-sm text-slate-700">
                <li>MSAL client login in the Next.js portal for user context.</li>
                <li>Customer lookup through Prisma-backed customer-service.</li>
                <li>SharePoint document listing and upload through document-service and graph-service app tokens.</li>
              </ul>
            </div>
          </section>
        </SignedOut>

        <SignedIn>
          <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-amber-700">Customer session</p>
                  <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">{profile?.displayName ?? account?.name}</h1>
                  <p className="mt-2 text-sm text-slate-600">{profile?.mail ?? profile?.userPrincipalName ?? account?.username}</p>
                </div>
                <button
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
                  onClick={() => void logout()}
                  type="button"
                >
                  Sign out
                </button>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Available workspaces</p>
                <div className="mt-4 grid gap-3">
                  {customers.map((customer) => (
                    <button
                      className={`rounded-2xl border px-4 py-3 text-left ${
                        selectedCustomerId === customer.id ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-950"
                      }`}
                      key={customer.id}
                      onClick={() => setSelectedCustomerId(customer.id)}
                      type="button"
                    >
                      <p className="font-medium">{customer.name}</p>
                      <p className={`mt-1 text-sm ${selectedCustomerId === customer.id ? "text-slate-300" : "text-slate-500"}`}>
                        Drive {customer.driveId}
                      </p>
                    </button>
                  ))}
                  {!customers.length && !isBusy ? (
                    <p className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                      No customer workspaces are registered yet. Create one from the internal portal first.
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <h2 className="text-lg font-semibold text-slate-950">Upload text document</h2>
                <input
                  className="mt-4 w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                  onChange={(event) => setUploadName(event.target.value)}
                  value={uploadName}
                />
                <textarea
                  className="mt-3 min-h-40 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                  onChange={(event) => setUploadBody(event.target.value)}
                  value={uploadBody}
                />
                <button
                  className="mt-4 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white"
                  disabled={!selectedCustomer || isBusy}
                  onClick={() => void handleUpload()}
                  type="button"
                >
                  Upload to SharePoint
                </button>
              </div>
            </aside>

            <div className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-amber-700">Document workspace</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                    {selectedCustomer?.name ?? "Choose a workspace"}
                  </h2>
                </div>
                <button
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
                  disabled={!selectedCustomerId || isBusy}
                  onClick={() => selectedCustomerId && void refreshDocuments(selectedCustomerId)}
                  type="button"
                >
                  Refresh files
                </button>
              </div>

              {error ? <p className="mt-4 text-sm text-rose-700">{error}</p> : null}

              <div className="mt-6 grid gap-3">
                {documents.map((document) => (
                  <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-slate-200 p-4" key={document.id}>
                    <div>
                      <p className="font-medium text-slate-950">{document.name}</p>
                      <a className="mt-1 block text-sm text-slate-500 hover:text-slate-950" href={document.path} rel="noreferrer" target="_blank">
                        Open in SharePoint
                      </a>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                        {document.isFolder ? "Folder" : "File"} {document.size ? `• ${document.size} bytes` : ""}
                      </p>
                    </div>
                    <button
                      className="rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-700"
                      onClick={() => void handleDelete(document.id)}
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {!documents.length && selectedCustomerId && !isBusy ? (
                  <p className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                    No files found in the selected SharePoint drive.
                  </p>
                ) : null}
              </div>
            </div>
          </section>
        </SignedIn>
      </div>
    </main>
  );
}