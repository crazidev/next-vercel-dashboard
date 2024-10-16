import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  out: './server/database/drizzle',
  schema: './server/database/drizzle/',
  dbCredentials: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    database: 'postgres',
    password: '4663789',
    ssl: false,
  },
  verbose: true,
  strict: true
});

// export default defineConfig({
//   dialect: 'mysql',
//   out: './server/database/drizzle',
//   schema: './server/database/drizzle/schema.ts',
//   dbCredentials: {
//     host: '127.0.0.1',
//     port: 3306,
//     user: 'root',
//     database: 'new_site',
//     password: undefined
//   },
//   verbose: true,
//   strict: true
// });
