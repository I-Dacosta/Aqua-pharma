import { writeFile } from 'node:fs/promises';

const WORLD_URL = 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json';

const OPERATING_COUNTRIES = new Map([
  ['Australia', 'AUS'],
  ['Belgium', 'BEL'],
  ['Canada', 'CAN'],
  ['Chile', 'CHL'],
  ['Ecuador', 'ECU'],
  ['Indonesia', 'IDN'],
  ['Norway', 'NOR'],
  ['United States of America', 'USA']
]);

const response = await fetch(WORLD_URL);
if (!response.ok) {
  throw new Error(`Failed to fetch world GeoJSON: ${response.status}`);
}

const world = await response.json();
const features = world.features
  .filter((feature) => OPERATING_COUNTRIES.has(feature.properties?.name))
  .map((feature) => ({
    ...feature,
    id: OPERATING_COUNTRIES.get(feature.properties.name),
    properties: {
      ...feature.properties,
      ISO_A3: OPERATING_COUNTRIES.get(feature.properties.name)
    }
  }));

await writeFile(
  new URL('../public/data/map-countries.geojson', import.meta.url),
  JSON.stringify({ type: 'FeatureCollection', features })
);

console.log(features.map((feature) => feature.properties.name).join('\n'));
