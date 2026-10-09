import { ArchitectureLanding } from "@/components/core/ArchitectureLanding";
import { architecturePages } from "@/data/architecture-pages";

export const metadata = { title: "Fish – Parasite Control | Aqua Pharma" };
export default function FishPage() { return <ArchitectureLanding page={architecturePages.fish} />; }
