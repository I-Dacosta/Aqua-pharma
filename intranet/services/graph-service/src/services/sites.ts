export async function createSite(displayName: string) {
  return { displayName, status: "queued" };
}
