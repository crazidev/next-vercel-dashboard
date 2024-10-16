import { pgTable, integer, text, boolean, json, foreignKey, pgEnum } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const transactionType = pgEnum("transaction_type", ['credit', 'debit'])

export const users = pgTable("users", {
	id: integer().primaryKey().notNull(),
	name: text(),
	email: text(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	phone: text(),
	address: json(),
	password: text().notNull(),
});

export const transactions = pgTable("transactions", {
	id: integer().primaryKey().notNull(),
	userId: integer("user_id"),
	amount: integer(),
	type: transactionType(),
},
(table) => {
	return {
		transactionsUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "transactions_user_id_fkey"
		}),
	}
});
