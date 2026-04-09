export async function addPermission(siteId: string, principalId: string, role: string) {
  return { siteId, principalId, role, status: "queued" };
}
