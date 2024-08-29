import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'mysql',
  out: './lib/drizzle',
  schema: './lib/drizzle/schema.ts',
  dbCredentials: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    database: 'new_site',
    password: undefined
  },
  verbose: true,
  strict: true
});
