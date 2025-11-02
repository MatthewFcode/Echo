import { Router } from 'express'
import * as db from '../db/functions/chats.ts'
import { wss } from '../server.ts'
import ws from 'ws'

const router = Router()

// Get all chats from a specific userId
router.get('/all/:id', async (req, res) => {
  try {
    const userId = Number(req.params.id)
    const result = await db.getAllChats(userId)
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json('Internal server error')
  }
})

// Get chat by chat.id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const result = await db.getChatByChatId(id)
    res.json(result)
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async (req, res) => {
  try {
    const { userId, userId2 } = req.body

    const check = await db.checkIfChatExists({ userId, userId2 })

    if (check == undefined) {
      const result = await db.createChat({ userId, userId2 })
      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(
            JSON.stringify({
              type: 'database_change',
              messsage: 'New chat created',
              action: 'chat_created',
            }),
          )
        }
      })
      res.status(201).json(result)
    } else {
      res.json([check.id])
    }
  } catch (err) {
    console.log(err)
    res.status(400).json('Bad Post request')
  }
})

export default router
