import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { StatusCodes } from 'http-status-codes'
import connection from '../db/connection'
import server from '../server'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import path from 'path'
const db = connection

const testUserId = 'auth0|test-user-id'
const mockJwt = jwt.sign({
  sub: testUserId,
  iss: 'https://hotoke-abe.au.auth0.com',
  aud: 'https://whats-up/api'
}, 'test-secret',   { algorithm: 'HS256', expiresIn: '1h' })

// Migrates any changes to database before running tests
beforeAll(async () => {
  await db.migrate.latest()
})

// Runs seeds to return to original database data
beforeEach(async () => {
  await db.seed.run()
})

// Closes down the connection after tests run
afterAll(async () => {
  await db.destroy()
})

describe('getting users', () => {
  it('responds with 1 or more users', async () => {
    const response = await request(server).get('/api/v1/users').set('Authorization', `Bearer ${mockJwt}`)
    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body[0]).toStrictEqual({
      id: 1,
      auth0id: 'google-oauth2|10987654321',
      user_name: 'Bob',
      profile_pic: 'https://static.wikia.nocookie.net/btb/images/9/9d/434.jpg/revision/latest/scale-to-width-down/1200?cb=20230414211405'
    })

  })
})

describe('getting a user by an ID', () => {
  it('takes an ID as a user and responds with the correct user data', async () => {
    const response = await request(server)
    .get('/api/v1/users/me')
    .set('Authorization', `Bearer ${mockJwt}`)
    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toStrictEqual(  {user: {
      id:4,
      auth0id: 'auth0|test-user-id', 
      user_name: 'Test User',
      profile_pic: '/images/test.jpg',
    }})

  })
})


// testing post route without testing the multer upload || currently sends the profile photo as an empty string
describe('posting a user to the database', () => {
  it('takes user information and adds it to the user table on the database', async () => {
    const dummyUsername = 'Hugh Janus'
    const response = await request(server)
    .post('/api/v1/users')
    .set('Authorization', `Bearer ${mockJwt}`)
    .field('username', dummyUsername)
    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body[0]).toStrictEqual({
      auth0id: 'auth0|test-user-id',
      id: 7,
      user_name: 'Hugh Janus', 
      profile_pic: ''
    })
  })
})