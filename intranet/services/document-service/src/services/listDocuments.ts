type DocumentRecord = {
  id: string;
  customerId: string;
  name: string;
  path: string;
  createdAt: string;
  size?: number;
  isFolder?: boolean;
};

type SharePointDocument = {
  id: string;
  name: string;
  webUrl?: string;
  lastModifiedDateTime?: string | null;
  size?: number;
  isFolder?: boolean;
};

export async function listDocuments(
  customerId: string,
  documents: SharePointDocument[],
): Promise<DocumentRecord[]> {
  return documents.map((document) => ({
    id: document.id,
    customerId,
    name: document.name,
    path: document.webUrl ?? "",
    createdAt: document.lastModifiedDateTime ?? new Date().toISOString(),
    size: document.size ?? 0,
    isFolder: document.isFolder ?? false,
  }));
}
