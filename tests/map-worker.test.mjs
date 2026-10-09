import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = new URL("..", import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), "utf8");

test("MapLibre uses the first-party worker before creating the map", () => {
    const constants = read("src/components/home/map/mapConstants.ts");
    const initialization = read("src/components/home/map/useMapInitialization.ts");
    const worker = read("public/maplibre-gl-worker.mjs");
    const packageJson = JSON.parse(read("package.json"));
    const version = packageJson.dependencies["maplibre-gl"].replace(/^[^\d]*/, "");

    assert.match(constants, /MAPLIBRE_WORKER_URL = '\/maplibre-gl-worker\.mjs'/);
    assert.ok(
        initialization.indexOf("maplibregl.setWorkerUrl(MAPLIBRE_WORKER_URL)") < initialization.indexOf("new maplibregl.Map"),
        "the worker URL must be configured before MapLibre creates a map"
    );
    assert.match(worker, new RegExp(`v${version.replaceAll(".", "\\.")}`));
});
