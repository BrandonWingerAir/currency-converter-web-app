import { serveStatic } from 'hono/bun'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/*', cors())

app.use('/data/*', serveStatic({root: './'}))

app.get('/currencies', (c) => {
  return c.redirect('/data/currencies.json')
})

app.get('/names', (c) => {
  return c.redirect('/data/names.json')
})

const PORT = 8088

const server = Bun.serve({
  port: PORT,
  fetch: app.fetch
})

console.log(`Server is running on port ${server.port}`);

export default app
