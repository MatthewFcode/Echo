import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import multer from 'multer'
import * as db from '../db/functions/users.ts'
import cloudinary from '../cloudinary.js'
import { unlink } from 'node:fs/promises'

const router = Router()
const upload = multer({ dest: 'tmp/' })

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const result = await db.getAllUsers()
    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json('Internal Server Error')
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

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const result = await db.getUserByUserId(id)
    res.json({ user: result })
  } catch (err) {
    console.log(err)
    res.status(500).json('Internal Server Error')
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
      let profilePic = ''

      //upload to cloudinary
      if (req.file) {
        try {
          // Upload to Cloudinary
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'echo_profiles',
            transformation: [{ width: 300, height: 300, crop: 'fill' }],
          })
          profilePic = result.secure_url

          // Clean up temp file
          await unlink(req.file.path)
        } catch (uploadErr) {
          console.error('Cloudinary upload error:', uploadErr)
          // Clean up temp file even if upload fails
          try {
            await unlink(req.file.path)
          } catch (unlinkErr) {
            console.error('Failed to delete temp file:', unlinkErr)
          }
          throw new Error('Failed to upload image')
        }
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
