import cors from "@fastify/cors";
import Fastify from "fastify";
import { z } from "zod";

import { loadPlatformConfig } from "@platform/config";
import { prisma } from "@platform/db";

import { listDocuments } from "./services/listDocuments.js";

const config = loadPlatformConfig();
const app = Fastify({ logger: true });
const uploadDocumentSchema = z.object({
  name: z.string().min(1),
  contentBase64: z.string().min(1),
  folderPath: z.string().optional(),
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

async function graphRequest<T>(requestPath: string, accessToken: string, init: RequestInit = {}) {
  const response = await fetch(`${config.GRAPH_SERVICE_URL}${requestPath}`, {
    ...init,
    headers: {
      Accept: "application/json",
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

await app.register(cors, { origin: true });

await prisma.$connect();

app.get("/health", async () => ({ service: "document-service", status: "ok" }));

app.get("/documents/:customerId", async (request, reply) => {
  const { customerId } = request.params as { customerId: string };
  const customer = await prisma.customer.findUnique({ where: { id: customerId } });
  if (!customer) {
    return reply.code(404).send({ message: "Customer not found" });
  }

  const accessToken = getAccessToken(request.headers);
  void accessToken;
  const response = await graphRequest<{ value: Awaited<ReturnType<typeof listDocuments>> }>(
    `/sites/${encodeURIComponent(customer.siteId)}/documents?driveId=${encodeURIComponent(customer.driveId)}`,
    accessToken,
  );

  return listDocuments(customerId, response.value);
});

app.post("/documents/:customerId", async (request, reply) => {
  const { customerId } = request.params as { customerId: string };
  const customer = await prisma.customer.findUnique({ where: { id: customerId } });
  if (!customer) {
    return reply.code(404).send({ message: "Customer not found" });
  }

  const parsed = uploadDocumentSchema.safeParse(request.body);
  if (!parsed.success) {
    return reply.code(400).send({ issues: parsed.error.issues });
  }

  const accessToken = getAccessToken(request.headers);
  void accessToken;
  return graphRequest(`/drives/${encodeURIComponent(customer.driveId)}/documents`, accessToken, {
    method: "POST",
    body: JSON.stringify(parsed.data),
  });
});

app.delete("/documents/:customerId/:itemId", async (request, reply) => {
  const { customerId, itemId } = request.params as { customerId: string; itemId: string };
  const customer = await prisma.customer.findUnique({ where: { id: customerId } });
  if (!customer) {
    return reply.code(404).send({ message: "Customer not found" });
  }

  const accessToken = getAccessToken(request.headers);
  void accessToken;
  await graphRequest(`/drives/${encodeURIComponent(customer.driveId)}/documents/${encodeURIComponent(itemId)}`, accessToken, {
    method: "DELETE",
  });

  return reply.code(204).send();
});

await app.listen({ host: "0.0.0.0", port: config.DOCUMENT_SERVICE_PORT });
