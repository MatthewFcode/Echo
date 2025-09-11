import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import { StatusCodes } from 'http-status-codes'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ message: 'Public users route (no authentication required)' })
})

router.get('/profile', checkJwt, (req: JwtRequest, res) => {
  if (!req.auth?.sub) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }

  res.json({
    message: 'Protected route: valid token received',
    user: req.auth,
  })
})

export default router
