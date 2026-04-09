import cors from "@fastify/cors";
import Fastify from "fastify";
import { z } from "zod";

import { loadPlatformConfig } from "@platform/config";
import { prisma } from "@platform/db";

import { createCustomerWorkspace } from "./services/createCustomerWorkspace.js";

const config = loadPlatformConfig();
const app = Fastify({ logger: true });
const createCustomerSchema = z.object({
  name: z.string().min(2),
  tenant: z.string().optional(),
  siteId: z.string().min(2),
  driveId: z.string().optional(),
});

function getAccessToken(headers: Record<string, string | string[] | undefined>) {
  const authorization = headers.authorization;
  if (!authorization || Array.isArray(authorization) || !authorization.startsWith("Bearer ")) {
    const error = new Error("Missing bearer token") as Error & { statusCode?: number };
    error.statusCode = 401;
    throw error;
  }

  return authorization.slice("Bearer ".length);
}

async function resolveDriveId(siteId: string) {
  const response = await fetch(`${config.GRAPH_SERVICE_URL}/sites/${encodeURIComponent(siteId)}/drive`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const drive = (await response.json()) as { id: string };
  return drive.id;
}

await app.register(cors, { origin: true });
app.get("/health", async () => ({ service: "customer-service", status: "ok" }));

await prisma.$connect();

app.get("/customers", async () => prisma.customer.findMany({ orderBy: { createdAt: "desc" } }));

app.get("/customers/:customerId", async (request, reply) => {
  const { customerId } = request.params as { customerId: string };
  const customer = await prisma.customer.findUnique({ where: { id: customerId } });
  if (!customer) {
    return reply.code(404).send({ message: "Customer not found" });
  }

  return customer;
});

app.post("/customers", async (request, reply) => {
  const parsed = createCustomerSchema.safeParse(request.body);
  if (!parsed.success) {
    return reply.code(400).send({ issues: parsed.error.issues });
  }

  const accessToken = getAccessToken(request.headers);
  void accessToken;
  const driveId = parsed.data.driveId ?? (await resolveDriveId(parsed.data.siteId));
  const draft = await createCustomerWorkspace(parsed.data.name);

  return prisma.customer.create({
    data: {
      id: draft.id,
      name: parsed.data.name,
      tenant: parsed.data.tenant ?? config.ENTRA_TENANT_ID,
      siteId: parsed.data.siteId,
      driveId,
    },
  });
});

await app.listen({ host: "0.0.0.0", port: config.CUSTOMER_SERVICE_PORT });
