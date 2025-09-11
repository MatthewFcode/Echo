import { Router } from 'express'
import * as db from '../db/functions/messages.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { chatId, userId } = req.body
    const result = await db.getMessagesByChatIDAndUserId(chatId, userId)
    res.json(result)
  } catch (err) {
    console.log(err)
    res.send(500).json('Internal server error')
  }
})

router.post('/', async (req, res) => {
  try {
    const { chatId, message, image, userId, timeStamp } = req.body

    const chat_id = chatId
    const user_id = userId

    const newChat = {
      message: message,
      image: image,
      time_stamp: timeStamp,
      chat_id,
      user_id,
    }
    const result = await db.sendChat(newChat, chat_id, user_id)
    res.json(result)
  } catch (err) {
    console.log(err)
    res.send(400).json('Bad post request')
  }
})

export default router
