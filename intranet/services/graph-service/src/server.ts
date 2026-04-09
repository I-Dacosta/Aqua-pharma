import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import Fastify from "fastify";

import { loadPlatformConfig } from "@platform/config";

import {
  deleteDocument,
  getDefaultDrive,
  getSignedInUser,
  listSiteDocuments,
  searchSites,
  uploadDocument,
} from "./services/graphApi.js";

const config = loadPlatformConfig();
const app = Fastify({ logger: true });

function getAccessToken(headers: Record<string, string | string[] | undefined>) {
  const authorization = headers.authorization;
  if (!authorization || Array.isArray(authorization) || !authorization.startsWith("Bearer ")) {
    throw app.httpErrors.unauthorized("Missing bearer token");
  }

  return authorization.slice("Bearer ".length);
}

await app.register(cors, { origin: true });
await app.register(sensible);

app.get("/health", async () => ({ service: "graph-service", status: "ok" }));

app.get("/me", async (request) => {
  return getSignedInUser(getAccessToken(request.headers));
});

app.get("/sites/search", async (request, reply) => {
  const { query } = request.query as { query?: string };
  if (!query) {
    return reply.code(400).send({ message: "query is required" });
  }

  return searchSites(query);
});

app.get("/sites/:siteId/drive", async (request) => {
  const { siteId } = request.params as { siteId: string };
  return getDefaultDrive(siteId);
});

app.get("/sites/:siteId/documents", async (request) => {
  const { siteId } = request.params as { siteId: string };
  const { driveId } = request.query as { driveId?: string };
  return listSiteDocuments(siteId, driveId);
});

app.post("/drives/:driveId/documents", async (request, reply) => {
  const { driveId } = request.params as { driveId: string };
  const body = request.body as { name?: string; contentBase64?: string; folderPath?: string };

  if (!body?.name || !body?.contentBase64) {
    return reply.code(400).send({ message: "name and contentBase64 are required" });
  }

  return uploadDocument(driveId, body.name, body.contentBase64, body.folderPath);
});

app.delete("/drives/:driveId/documents/:itemId", async (request, reply) => {
  const { driveId, itemId } = request.params as { driveId: string; itemId: string };
  await deleteDocument(driveId, itemId);
  return reply.code(204).send();
});

await app.listen({ host: "0.0.0.0", port: config.GRAPH_SERVICE_PORT });
