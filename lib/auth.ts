'use server';

import { cookies } from "next/headers";
import { users } from "./drizzle/schema";
import { eq } from "drizzle-orm";
import { SelectUsers } from "server/fetch/select_user";
import { db } from "server/database/db";

interface authProps {
    isLoggedIn?: boolean,
    token?: string,
    user?: SelectUsers,
}

export async function auth(): Promise<authProps> {
    var user_id = cookies().get('user_id')?.value;
    var token = cookies().get('token')?.value;
    var user: SelectUsers | undefined;

    if(user_id !== undefined){
        user = await db.query.users.findFirst({
            where: eq(users.id, parseInt(user_id))
          });
    }

    var value = {
        user: user,
        isLoggedIn: user !== undefined,
        token: token
    };

    return value;
}