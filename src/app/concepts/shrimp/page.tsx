import { ArchitectureLanding } from "@/components/core/ArchitectureLanding";
import { architecturePages } from "@/data/architecture-pages";

export const metadata = { title: "Shrimp – Pond Health | Aqua Pharma" };
export default function ShrimpPage() { return <ArchitectureLanding page={architecturePages.shrimp} />; }
