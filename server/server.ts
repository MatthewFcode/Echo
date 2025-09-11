import express from 'express'
import * as Path from 'node:path'

import userRoutes from './routes/users.ts'
import chatsRoutes from './routes/chats.ts'
import messagesRoutes from './routes/messages.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/users', userRoutes)
server.use('/api/v1/chats', chatsRoutes)
server.use('api/v1/messages', messagesRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
