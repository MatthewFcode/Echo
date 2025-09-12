import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { StatusCodes } from 'http-status-codes'
import connection from '../db/connection'
import server from '../server'
import request from 'supertest'
// import jwt from 'jsonwebtoken'

const db = connection

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

describe('Getting all messages from a chat', () => {
  it('gets all the messages from a specific chat Id unique to a conversation between two users', async () => {
    const response = await request(server).get('/api/v1/messages')
    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body[0]).toStrictEqual({
      chat_id: 1,
      message: 'Hey, how are you?',
      image: '',
      user_name: 'Bob',
      profile_pic:
        'https://static.wikia.nocookie.net/btb/images/9/9d/434.jpg/revision/latest/scale-to-width-down/1200?cb=20230414211405',
      time_stamp: '2025-09-12T10:00:00Z',
    })
  })
})
