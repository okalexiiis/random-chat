import { Hono } from 'hono'
import db from './core/db/drizzle';
const port = Bun.env.PORT
const app = new Hono()

app.get('/', async (c) => {
  const result = await db.execute('select 1');
  return c.json(result)
})

export default {
  port: port,
  fetch: app.fetch
}
