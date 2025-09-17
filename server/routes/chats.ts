import { Router } from 'express'
import * as db from '../db/functions/chats.ts'

const router = Router()

// Get all chats from a specific userId
router.get('/all/:id', async (req, res) => {
  try {
    const userId = Number(req.params.id)
    const result = await db.getAllChats(userId)
    res.json(result)
  } catch (err) {
    console.log(err)
    res.send(500).json('Internal server error')
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
    const result = await db.createChat({ userId, userId2 })
    res.json(result)
  } catch (err) {
    console.log(err)
  }
})

export default router
