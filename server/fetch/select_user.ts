import { eq } from "drizzle-orm";
import { db } from "server/database/db";
import { users } from "server/database/drizzle/schema";

export type SelectUsers = typeof users.$inferSelect;

export async function getUser({ email }: { email: any }): Promise<{
  user?: SelectUsers;
}> {
  var res = await db.select().from(users).where(
    eq(users.email, email)
  );

  return {
    user: res.at(0),
  };
}
