import { defineConfig } from 'drizzle-kit';

const URL = process.env.DATABASE_URL!; // si estás seguro que existe

export default defineConfig({
  out: './drizzle',
  schema: './src/core/db/drizzle/schemas/*.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: URL,
  },
});
