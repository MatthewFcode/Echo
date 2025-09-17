import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import * as db from '../db/functions/messages.ts'
import { wss } from '../server.ts'
import ws from 'ws'

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

router.get('/:id', async (req, res) => {
  try {
    const chat_id = Number(req.params.id)

    const result = await db.getMessagesById(chat_id)
    res.status(200).json(result)
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
      profilePhoto = `/images/${req.file?.filename}`
    }


    const convert = {
      message,
      time_stamp: timeStamp,
      chat_id: chatId,
      user_id: userId,
      image: profilePhoto,
    }
    const result = await db.sendChat(convert)

    // This will broadcast the changes to the server to other clients connected to the websocket


    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(
          JSON.stringify({
            type: 'database_change',
            message: 'New message added',
          }),
        )
      }
    })


    res.status(201).json(result) //{ newMessage: result }


  } catch (err) {
    res.sendStatus(400).json('something went wrong with the image url')
  }
})

// Delete Message
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteMessage(id)

    // Websocket
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(
          JSON.stringify({
            type: 'database_change',
            message: 'New message added',
          }),
        )
      }
    })

    res.sendStatus(204)
  } catch (error) {
    console.error(error)
  }
})

export default router
