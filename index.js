import createBareServer from '@tomphttp/bare-server-node'
import http from 'node:http'
import { createRequire } from "module"
const require = createRequire(import.meta.url)
const port = process.env.PORT || 80

// Create Bare
const bare = createBareServer('/bare/')

import express from 'express'
const app = express();

app.use(express.static("./public"));

app.get('/', (req, res) => {
  res.sendFile("index.html", { root: "./html" })
})

app.get('/proxy', (req, res) => {
  res.sendFile("proxy.html", { root: "./html" })
})

app.get('/games', (req, res) => {
  res.sendFile("games.html", { root: "./html" })
})

app.get('/apps', (req, res) => {
  res.sendFile("apps.html", { root: "./html" })
})

app.get('/settings', (req, res) => {
  res.sendFile("settings.html", { root: "./html" })
})

app.get('/qa', (req, res) => {
  res.sendFile("qa.html", { root: "./html" })
})

app.use((req, res) => {
  res.status(404).sendFile("404.html", { root: "./html" })
})

const httpServer = http.createServer()

httpServer.on('request', (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res)
  } else {
    app(req, res)
  }
})

httpServer.on('upgrade', (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head)
  } else {
    socket.end()
  }
});
httpServer.listen({ port: port }, () => { 
  console.log(`\x1b[42m\x1b[1mBIG Math ----- Port: ${port}\x1b[0m`); 
  console.log('\x1b[41m\x1b[5m\x1b[1m\x1b[33mPLEASE NOTE: BIG Math is in a development stage. Expect bugs!\x1b[0m'); 
})