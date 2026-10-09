import type { Locale } from "@/i18n/config";

export type EventRecord = {
    id: string;
    startsAt: string;
    endsAt?: string;
    location: string;
    organizer: string;
    organizerUrl: string;
    image: string;
    imageAlt: string;
    title: Record<Locale, string>;
    excerpt: Record<Locale, string>;
    type: "Event" | "R&D" | "Press";
};

// Add confirmed events here with their image in public/; Home and About share this source.
export const EVENTS: EventRecord[] = [];

export function getUpcomingEvents<T extends { startsAt: string; endsAt?: string }>(
    events: readonly T[],
    now = new Date(),
): T[] {
    const today = now.toISOString().slice(0, 10);
    return events
        .filter((event) => /^\d{4}-\d{2}-\d{2}$/.test(event.startsAt))
        .filter((event) => (event.endsAt ?? event.startsAt) >= today)
        .toSorted((a, b) => a.startsAt.localeCompare(b.startsAt))
        .slice(0, 3);
}
