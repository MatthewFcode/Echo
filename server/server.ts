import express from 'express'
import * as Path from 'node:path'
import path from 'path'
import userRoutes from './routes/users.ts'
import chatsRoutes from './routes/chats.ts'
import messagesRoutes from './routes/messages.ts'

import { createServer } from 'http'
import { WebSocketServer } from 'ws'

const app = express()

// shared HTTP server and WebSocket server
const server = createServer(app)
const wss = new WebSocketServer({ server })

app.use(express.json())

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/chats', chatsRoutes)
app.use('/api/v1/messages', messagesRoutes)
app.use('/images', express.static(path.resolve('public/images')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(Path.resolve('public')))
  app.use('/assets', express.static(Path.resolve('./dist/assets')))
  app.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

// WebSocket server setup

wss.on('connection', (ws) => {
  console.log('Client connected')

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`)
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

export { server, wss }
