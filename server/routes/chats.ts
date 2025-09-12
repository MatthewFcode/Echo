import { Router } from 'express'
import * as db from '../db/functions/chats.ts'

const router = Router()

// Get a single chat
router.get('/', async (req, res) => {
  try {
    const { userId, userId2 } = req.body
    const result = await db.getChat(userId, userId2)
    res.json(result)
  } catch (err) {
    console.log(err)
    res.send(500).json('Internal server error')
  }
})

// Get all chats from a specific userId
router.get('/all/:id', async (req, res) => {
  try {
    const userId = Number(req.params.id)
    console.log(userId)
    const result = await db.getAllChats(userId)
    console.log(result)
    res.json(result)
  } catch (err) {
    console.log(err)
    res.send(500).json('Internal server error')
  }
})

router.post('/', async (req, res) => {
  try {
    const { userId, userId2 } = req.body
    const result = await db.createChat(userId, userId2)
    res.json(result)
  } catch (err) {
    console.log(err)
  }
})

export default router
