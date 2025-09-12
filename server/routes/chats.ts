import { Router } from 'express'
import * as db from '../db/functions/chats.ts'

const router = Router()

// Get a single chat
router.get('/', async (req, res) => {
  try {
    const { userId, userId2 } = req.query
    const result = await db.getChat(Number(userId), Number(userId2))
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
    const result = await db.getAllChats(userId)
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json('Internal server error')
  }
})

router.post('/', async (req, res) => {
  try {
    const { userId, userId2 } = req.body
    const result = await db.createChat(userId, userId2)
    res.status(201).json(result)
  } catch (err) {
    console.log(err)
    res.status(400).json('Bad Post request')
  }
})

export default router
