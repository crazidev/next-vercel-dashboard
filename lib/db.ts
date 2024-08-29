import 'server-only';

import { drizzle } from 'drizzle-orm/mysql2';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import mysql from 'mysql2';

import * as dbSchema from './drizzle/schema';

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  database: 'new_site',
  password: undefined
});

export const db = drizzle(connection, { schema: dbSchema, mode: "default" });


export type SelectUsers = typeof dbSchema.users.$inferSelect;
export const insertUsersSchema = createInsertSchema(dbSchema.users);

export async function getProducts(
): Promise<{
  users: SelectUsers[]
}> {
  var data =  await db.select().from(dbSchema.users);
  console.log(data);
  return {
    users: data
  };
}