import { getAppOnlyAccessToken } from "../clients/graphClient.js";

type GraphItem = {
  id: string;
  name: string;
  webUrl?: string;
  size?: number;
  lastModifiedDateTime?: string;
  file?: unknown;
  folder?: unknown;
  parentReference?: {
    driveId?: string;
    siteId?: string;
    path?: string;
  };
};

type GraphCollection<T> = {
  value: T[];
};

const graphBaseUrl = "https://graph.microsoft.com/v1.0";

function encodePathSegments(path: string) {
  return path
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

async function graphRequest<T>(accessToken: string, requestPath: string, init: RequestInit = {}) {
  const response = await fetch(`${graphBaseUrl}${requestPath}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Microsoft Graph request failed with ${response.status}`);
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}

async function graphBinaryRequest<T>(accessToken: string, requestPath: string, body: Buffer) {
  const response = await fetch(`${graphBaseUrl}${requestPath}`, {
    method: "PUT",
    body,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/octet-stream",
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Microsoft Graph upload failed with ${response.status}`);
  }

  return (await response.json()) as T;
}

async function graphAppRequest<T>(requestPath: string, init: RequestInit = {}) {
  const accessToken = await getAppOnlyAccessToken();
  return graphRequest<T>(accessToken, requestPath, init);
}

async function graphAppBinaryRequest<T>(requestPath: string, body: Buffer) {
  const accessToken = await getAppOnlyAccessToken();
  return graphBinaryRequest<T>(accessToken, requestPath, body);
}

export async function getSignedInUser(accessToken: string) {
  return graphRequest<{ id: string; displayName: string; mail?: string; userPrincipalName?: string }>(
    accessToken,
    "/me?$select=id,displayName,mail,userPrincipalName",
  );
}

export async function searchSites(query: string) {
  const data = await graphRequest<GraphCollection<{ id: string; displayName: string; name?: string; webUrl?: string }>>(
    await getAppOnlyAccessToken(),
    `/sites?search=${encodeURIComponent(query)}`,
    {
      headers: {
        ConsistencyLevel: "eventual",
      },
    },
  );

  return {
    value: data.value.map((site) => ({
      id: site.id,
      name: site.displayName || site.name || "Unnamed site",
      webUrl: site.webUrl,
    })),
  };
}

export async function getDefaultDrive(siteId: string) {
  return graphAppRequest<{ id: string; name: string; webUrl?: string }>(
    `/sites/${encodeURIComponent(siteId)}/drive?$select=id,name,webUrl`,
  );
}

export async function listSiteDocuments(siteId: string, driveId?: string) {
  const requestPath = driveId
    ? `/drives/${encodeURIComponent(driveId)}/root/children?$select=id,name,webUrl,size,lastModifiedDateTime,file,folder,parentReference`
    : `/sites/${encodeURIComponent(siteId)}/drive/root/children?$select=id,name,webUrl,size,lastModifiedDateTime,file,folder,parentReference`;

  const data = await graphAppRequest<GraphCollection<GraphItem>>(requestPath);

  return {
    value: data.value.map((item) => ({
      id: item.id,
      name: item.name,
      webUrl: item.webUrl,
      size: item.size ?? 0,
      lastModifiedDateTime: item.lastModifiedDateTime ?? null,
      isFolder: Boolean(item.folder),
      driveId: item.parentReference?.driveId ?? driveId ?? null,
      siteId: item.parentReference?.siteId ?? siteId,
    })),
  };
}

export async function uploadDocument(
  driveId: string,
  name: string,
  contentBase64: string,
  folderPath?: string,
) {
  const objectPath = encodePathSegments(folderPath ? `${folderPath}/${name}` : name);
  return graphAppBinaryRequest<GraphItem>(
    `/drives/${encodeURIComponent(driveId)}/root:/${objectPath}:/content`,
    Buffer.from(contentBase64, "base64"),
  );
}

export async function deleteDocument(driveId: string, itemId: string) {
  await graphAppRequest<null>(`/drives/${encodeURIComponent(driveId)}/items/${encodeURIComponent(itemId)}`, {
    method: "DELETE",
  });
}