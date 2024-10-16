-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."transaction_type" AS ENUM('credit', 'debit');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"name" text,
	"email" text,
	"email_verified" boolean DEFAULT false NOT NULL,
	"phone" text,
	"address" json,
	"password" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" integer NOT NULL,
	"user_id" integer,
	"amount" integer,
	"type" "transaction_type"
);

*/