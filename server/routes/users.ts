import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import multer from 'multer'
import path from 'path'
import * as db from '../db/functions/users.ts'

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

router.get('/me', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    const result = await db.getUserById(auth0Id as string)
    res.json({ user: result })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.post(
  '/',
  checkJwt,
  upload.single('profile_pic'),
  async (req: JwtRequest, res) => {
    try {
      const auth0Id = req.auth?.sub
      const { userName } = req.body
      // handling multer
      let profilePic = ''
      if (req.file) {
        // Store the relative path to the uploaded file
        profilePic = `/images/${req.file.filename}`
      }
      const convert = {
        user_name: userName as string,
        profile_pic: profilePic,
        auth0id: auth0Id as string,
      }

      const result = await db.createUser(convert)
      res.status(201).json(result)
    } catch (err) {
      console.log(err)
      res.status(400).json('bad post reequest')
    }
  },
)

export default router