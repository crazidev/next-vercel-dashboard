import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, text, index, foreignKey, unique, float, mysqlEnum, tinyint, varchar } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const admin = mysqlTable("admin", {
	id: int("id").autoincrement().notNull(),
	email: text("email").notNull(),
	password: text("password").notNull(),
	info: int("info").notNull(),
});

export const investments = mysqlTable("investments", {
	id: int("id").autoincrement().notNull(),
	user_id: int("user_id").notNull().references((): AnyMySqlColumn => users.id, { onUpdate: "cascade" } ),
	amount: float("amount").notNull(),
	profit: float("profit").notNull(),
	status: mysqlEnum("status", ['active','completed','error','']).notNull(),
	plan_id: int("plan_id").notNull().references(() => plans.id, { onUpdate: "cascade" } ),
	date: text("date").notNull(),
	counting_profit: int("counting_profit").notNull(),
	due_date: text("due_date").default('NULL'),
	user_funded: tinyint("user_funded").default(0).notNull(),
},
(table) => {
	return {
		user_id: index("user_id").on(table.user_id),
		plan_id: index("plan_id").on(table.plan_id),
		id: unique("id").on(table.id),
	}
});

export const payment_method = mysqlTable("payment_method", {
	id: int("id").autoincrement().notNull(),
	name: text("name").notNull(),
	icon: text("icon").notNull(),
	details: text("details").notNull(),
	network: text("network").default('NULL'),
},
(table) => {
	return {
		id: unique("id").on(table.id),
	}
});

export const plans = mysqlTable("plans", {
	id: int("id").autoincrement().notNull(),
	name: text("name").notNull(),
	min: int("min").notNull(),
	max: int("max"),
	profit_percentage: int("profit_percentage").notNull(),
	duration: text("duration").notNull(),
	type: varchar("type", { length: 20 }),
	json_info: text("json_info"),
	banner: text("banner"),
	icon: text("icon"),
	symbol: text("symbol"),
},
(table) => {
	return {
		id: unique("id").on(table.id),
	}
});

export const sequelizemeta = mysqlTable("sequelizemeta", {
	name: varchar("name", { length: 255 }).notNull(),
},
(table) => {
	return {
		name: unique("name").on(table.name),
	}
});

export const transactions = mysqlTable("transactions", {
	id: int("id").autoincrement().notNull(),
	type: mysqlEnum("type", ['deposit','withdrawal','bonus','']).notNull(),
	amount: float("amount").notNull(),
	user_id: int("user_id").notNull().references((): AnyMySqlColumn => users.id, { onUpdate: "cascade" } ),
	status: mysqlEnum("status", ['pending','confirmed','error','']),
	withdraw_addr: text("withdraw_addr"),
	date: text("date").notNull(),
	payment_method_id: int("payment_method_id").notNull().references(() => payment_method.id, { onUpdate: "cascade" } ),
	payment_slip: text("payment_slip"),
},
(table) => {
	return {
		user_id: index("user_id").on(table.user_id),
		payment_method_id: index("payment_method_id").on(table.payment_method_id),
		id: unique("id").on(table.id),
	}
});

export const users = mysqlTable("users", {
	id: int("id").autoincrement().notNull().references((): AnyMySqlColumn => transactions.user_id, { onDelete: "restrict", onUpdate: "restrict" } ).references((): AnyMySqlColumn => investments.user_id, { onDelete: "restrict", onUpdate: "restrict" } ),
	fullname: text("fullname").notNull(),
	email: text("email").notNull(),
	password: text("password").notNull(),
	gender: text("gender").notNull(),
	phone: text("phone").notNull(),
	country: text("country").notNull(),
	reg_date: text("reg_date").notNull(),
	status: mysqlEnum("status", ['pending_verification','verified','blocked','awaiting_verification']).default('pending_verification'),
	balance: float("balance"),
	profile_image: text("profile_image"),
	id_card: text("id_card"),
	currency: mysqlEnum("currency", ['$','£','R','']).default('R'),
},
(table) => {
	return {
		id: unique("id").on(table.id),
	}
});