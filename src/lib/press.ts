import { getEditorialPagesContent } from "@/i18n/editorial-pages";

export const releases = getEditorialPagesContent("en").media.releases.map((release) => ({
    ...release,
    slug: release.title.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
}));
