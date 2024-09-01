import { randomUUID } from "crypto";
import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

// ==================
// Tables
// ==================

export const users = sqliteTable("users", {
    id: id(),
    createdAt: createdAt(),
    email: text("email").unique().notNull(),
    password: text("password").notNull(),
});

export const events = sqliteTable(
    "events",
    {
        id: id(),
        createdAt: createdAt(),
        name: text("name").notNull(),
        startOn: date("start_on").notNull(),
        description: text("description"),

        streetNumber: integer("street_number"),
        street: integer("street"),
        zip: integer("zip"),
        bldg: integer("bldg"),

        isPrivate: boolean("is_private").default(false).notNull(),
        status: text("status", {
            enum: ["draft", "live", "started", "ended", "cancelled"],
        })
            .default("draft")
            .notNull(),

        createdById: text("created_by_id").notNull(),
    },
    function table(table) {
        return {
            unq: unique().on(table.createdById, table.name),
        };
    }
);

export const attendees = sqliteTable("attendees", {
    id: id(),
    createdAt: createdAt(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
});

export const rsvps = sqliteTable(
    "rsvps",
    {
        id: id(),
        createdAt: createdAt(),
        attendeeId: text("attendee_id"),
        eventId: text("event_id"),
        status: text("status", { enum: ["going", "not-going", "maybe"] })
            .default("going")
            .notNull(),
    },
    function table(table) {
        return {
            unq: unique().on(table.attendeeId, table.eventId),
        };
    }
);

// ==================
// Relations
// ==================

export const usersRelations = relations(users, function ({ many }) {
    return {
        events: many(events),
    };
});

export const eventsRelations = relations(events, function ({ many, one }) {
    return {
        rsvps: many(rsvps),
        createdBy: one(users, {
            references: [users.id],
            fields: [events.createdById],
        }),
    };
});

export const attendeesRelations = relations(attendees, function ({ many }) {
    return {
        rsvps: many(rsvps),
    };
});

export const rsvpsRelations = relations(rsvps, function ({ one }) {
    return {
        attendee: one(attendees, {
            fields: [rsvps.attendeeId],
            references: [attendees.id],
        }),
        event: one(events, {
            references: [events.id],
            fields: [rsvps.eventId],
        }),
    };
});

// ==================
// Utilities
// ==================

function id() {
    return text("id")
        .primaryKey()
        .$default(() => randomUUID());
}

function createdAt() {
    return text("created_at")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull();
}

function date(name: string) {
    return text(name);
}

function boolean(field: string) {
    return integer(field, { mode: "boolean" });
}
