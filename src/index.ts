import { Hono } from 'hono'
const port = Bun.env.PORT
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default {
  port: port,
  fetch: app.fetch
}
