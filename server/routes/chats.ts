import { Router } from 'express'
import * as db from '../db/functions/chats.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { user1Id, user2Id } = req.body
    const result = await db.getChat(user1Id, user2Id)
    res.json(result)
  } catch (err) {
    console.log(err)
    res.send(500).json('Internal server error')
  }
})

router.post('/', async (req, res) => {
  try {
    const { user1Id, user2Id } = req.body
    const result = await db.createChat(user1Id, user2Id)
    res.json(result)
  } catch (err) {
    console.log(err)
  }
})

export default router
