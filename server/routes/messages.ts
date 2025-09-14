import { Router } from 'express'
import * as db from '../db/functions/messages.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { chatId } = req.body
    const result = await db.getMessagesByChatID(chatId)
    res.json(result)
  } catch (err) {
    console.log(err)
    res.send(500).json('Internal server error')
  }
})

router.post('/', async (req, res) => {
  try {
    const { chatId, message, image, userId, timeStamp } = req.body

    const newChat = {
      message: message,
      image: image,
      time_stamp: timeStamp,
      chat_id: chatId,
      user_id: userId,
    }
    const result = await db.sendChat(newChat)
    console.log(result)
    console.log(newChat)
    res.json(result)
  } catch (err) {
    console.log(err)
    res.send(400).json('Bad post request')
  }
})

export default router
