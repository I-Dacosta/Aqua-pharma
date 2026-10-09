import { ArchitectureLanding } from "@/components/core/ArchitectureLanding";
import { architecturePages } from "@/data/architecture-pages";

export const metadata = { title: "Systems & Services | Aqua Pharma" };
export default function SystemsServicesPage() { return <ArchitectureLanding page={architecturePages.systems} />; }
