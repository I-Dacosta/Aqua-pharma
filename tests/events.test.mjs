import assert from "node:assert/strict";
import test from "node:test";
import { getUpcomingEvents } from "../src/data/events.ts";

const event = (id, startsAt) => ({ id, startsAt });

test("selects the next three events by date", () => {
    const today = new Date("2026-10-06T00:00:00Z");
    const items = [
        event("later", "2026-12-01"),
        event("past", "2026-10-05"),
        event("first", "2026-10-06"),
        event("third", "2026-11-01"),
        event("fourth", "2027-01-01"),
    ];

    assert.deepEqual(getUpcomingEvents(items, today).map((item) => item.id), ["first", "third", "later"]);
    assert.deepEqual(items.map((item) => item.id)[0], "later");
});

test("returns an empty state when every event has passed", () => {
    assert.deepEqual(getUpcomingEvents([event("past", "2026-01-01")], new Date("2026-10-06T00:00:00Z")), []);
});

test("keeps an ongoing date-range event and ignores malformed dates", () => {
    const items = [
        { ...event("ongoing", "2026-10-04"), endsAt: "2026-10-08" },
        event("invalid", "not-a-date"),
        event("future", "2026-10-10"),
    ];
    assert.deepEqual(getUpcomingEvents(items, new Date("2026-10-06T00:00:00Z")).map((item) => item.id), ["ongoing", "future"]);
});
