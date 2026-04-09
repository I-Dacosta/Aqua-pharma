import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import Fastify from "fastify";
const app = Fastify({ logger: true });

await app.register(cors, { origin: true });
await app.register(sensible);

app.get("/health", async () => ({ service: "api-gateway", status: "ok" }));

app.get("/routes", async () => ({
  graphServiceUrl: process.env.GRAPH_SERVICE_URL ?? "http://localhost:4001",
  customerServiceUrl: process.env.CUSTOMER_SERVICE_URL ?? "http://localhost:4002",
  documentServiceUrl: process.env.DOCUMENT_SERVICE_URL ?? "http://localhost:4003",
}));

const port = Number(process.env.API_GATEWAY_PORT ?? 4000);
await app.listen({ host: "0.0.0.0", port });
