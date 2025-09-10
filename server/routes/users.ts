import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'

import * as db from '../db/functions/users.ts'

const router = Router()

// getting all the users (auth protected but no auth Id needed to go in to the function so it isnt grabbeb out)
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const result = await db.getAllUsers()
    res.json(result)
  } catch (err) {
    console.log(err)
    res.send(500).json('Internal Server Error')
  }
})

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    const result = await db.getUserById(auth0Id as string)
    res.json({ result })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    const { username, profilePic, chatId } = req.body
    const convert = {
      user_name: username as string,
      profile_pic: profilePic as string,
      chat_id: chatId as number,
      auth0id: auth0Id as string,
    }

    const result = await db.createUser(convert)
    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(400).json('bad post reequest')
  }
})

export default router
