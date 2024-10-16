import { pgTable, text, boolean, json, serial, integer, pgEnum } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const transactionType = pgEnum("transaction_type", ['credit', 'debit'])

export const users = pgTable("users", {
	name: text(),
	email: text(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	phone: text(),
	address: json(),
	password: text().notNull(),
	id: serial().primaryKey().notNull(),
});

export const transactions = pgTable("transactions", {
	id: integer().notNull(),
	userId: integer("user_id"),
	amount: integer(),
	type: transactionType(),
});
