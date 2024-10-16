'use server';

import { users } from '@/lib/drizzle/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { db } from 'server/database/db';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '1h';

export async function login(formData: any) {
  // Validate form fields
  const validatedFields = z
    .object({
      email: z.string().email().trim(),
      password: z.string().trim()
    })
    .safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  var user = await db.query.users.findFirst({
    where: eq(users.email, validatedFields.data.email)
  });

  if (user?.password != validatedFields.data.password) {
    return {
      errors: {
        password: ['Wrong password']
      }
    };
  } else {
    // Generate JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    cookies().set('token', token);
    cookies().set('user_id', user.id.toString());

    return {
      success: true,
      message: 'Login Successful'
    };
  }
}
