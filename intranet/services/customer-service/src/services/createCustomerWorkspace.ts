type CustomerRecord = {
  id: string;
  name: string;
  tenant: string;
  siteId: string;
  driveId: string;
};

export async function createCustomerWorkspace(name: string): Promise<CustomerRecord> {
  return {
    id: crypto.randomUUID(),
    name,
    tenant: "pending",
    siteId: "pending",
    driveId: "pending",
  };
}
