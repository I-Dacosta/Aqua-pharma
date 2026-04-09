import path from "node:path";

import { config as loadDotEnv } from "dotenv";
import { PrismaClient } from "@prisma/client";

loadDotEnv({ quiet: true });
loadDotEnv({ path: path.resolve(process.cwd(), ".env"), quiet: true });
loadDotEnv({ path: path.resolve(process.cwd(), "../../.env"), quiet: true });

function resolveDatabaseUrl() {
	const databaseUrl = process.env.DATABASE_URL;

	if (!databaseUrl) {
		throw new Error("DATABASE_URL is required to initialize PrismaClient.");
	}

	return databaseUrl;
}

export const prisma = new PrismaClient({
	datasources: {
		db: {
			url: resolveDatabaseUrl(),
		},
	},
});
