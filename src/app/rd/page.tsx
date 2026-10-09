import { ArchitectureLanding } from "@/components/core/ArchitectureLanding";
import { architecturePages } from "@/data/architecture-pages";

export const metadata = { title: "Research & Development | Aqua Pharma" };
export default function ResearchPage() { return <ArchitectureLanding page={architecturePages.rd} />; }
