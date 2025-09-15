import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import * as db from '../db/functions/messages.ts'

const router = Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('public/images'))
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage: storage })

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

router.post('/', upload.single('uploaded_file'), async (req, res) => {
  try {
    const { chatId, message, userId, timeStamp } = req.body
    let profilePhoto = ''
    if (req.file) {
      profilePhoto =`/images/${req.file?.filename}`
    }
        const convert = {
        message,
        time_stamp: timeStamp,
        chat_id: chatId,
        user_id: userId,
        image: profilePhoto,
      }
      const result = await db.sendChat(convert)
      console.log(result)
      res.json({ newMessage: result })
    } catch(err) {
      res.sendStatus(400).json('something went wrong with the image url')
    }
    } )

export default router
