import type { Locale } from "@/i18n/config";

export type MarketSnapshotCopy = {
    title: string;
    employees: string;
    countries: string;
    jointVenture: string;
    partners: string;
    fish: string;
    shrimp: string;
};

export const marketSnapshotCopy: Record<Locale, MarketSnapshotCopy> = {
    en: { title: "Markets Snapshot", employees: "EMPLOYEES", countries: "COUNTRIES", jointVenture: "JOINT VENTURE", partners: "Solvay & Aquatiq", fish: "Fish", shrimp: "Shrimp" },
    es: { title: "Presencia global", employees: "EMPLEADOS", countries: "PAÍSES", jointVenture: "EMPRESA CONJUNTA", partners: "Solvay y Aquatiq", fish: "Peces", shrimp: "Camarón" },
    no: { title: "Markeder i korte trekk", employees: "ANSATTE", countries: "LAND", jointVenture: "FELLESFORETAK", partners: "Solvay og Aquatiq", fish: "Fisk", shrimp: "Reker" },
};
