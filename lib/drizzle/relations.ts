import { relations } from "drizzle-orm/relations";
import { users, investments, plans, transactions, payment_method } from "./schema";

export const investmentsRelations = relations(investments, ({one, many}) => ({
	user: one(users, {
		fields: [investments.user_id],
		references: [users.id],
		relationName: "investments_user_id_users_id"
	}),
	plan: one(plans, {
		fields: [investments.plan_id],
		references: [plans.id]
	}),
	users: many(users, {
		relationName: "users_id_investments_user_id"
	}),
}));

export const usersRelations = relations(users, ({one, many}) => ({
	investments: many(investments, {
		relationName: "investments_user_id_users_id"
	}),
	transactions: many(transactions, {
		relationName: "transactions_user_id_users_id"
	}),
	transaction: one(transactions, {
		fields: [users.id],
		references: [transactions.user_id],
		relationName: "users_id_transactions_user_id"
	}),
	investment: one(investments, {
		fields: [users.id],
		references: [investments.user_id],
		relationName: "users_id_investments_user_id"
	}),
}));

export const plansRelations = relations(plans, ({many}) => ({
	investments: many(investments),
}));

export const transactionsRelations = relations(transactions, ({one, many}) => ({
	user: one(users, {
		fields: [transactions.user_id],
		references: [users.id],
		relationName: "transactions_user_id_users_id"
	}),
	payment_method: one(payment_method, {
		fields: [transactions.payment_method_id],
		references: [payment_method.id]
	}),
	users: many(users, {
		relationName: "users_id_transactions_user_id"
	}),
}));

export const payment_methodRelations = relations(payment_method, ({many}) => ({
	transactions: many(transactions),
}));