import "server-only";

import { drizzle } from "drizzle-orm/node-postgres";
import { and, eq, sql } from "drizzle-orm";
import mysql from "mysql2";

import * as dbSchema from "./drizzle/schema";
import { connected } from "process";

import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: 'postgres',
  database: 'postgres',
  password: '4663789',
  ssl: false
});

export const db = drizzle(pool, { schema: dbSchema });

