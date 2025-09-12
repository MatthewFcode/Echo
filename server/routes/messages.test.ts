import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { StatusCodes } from 'http-status-codes'
import connection from '../db/connection'
import server from '../server'
import request from 'supertest'

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
    const response = await request(server)
      .get('/api/v1/messages')
      .query({ chatId: 1 })
    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body[0]).toStrictEqual({
      chat_id: 1,
      message: 'Hey, how are you?',
      image: '',
      user_name: 'Bob',
      profile_pic: 'https://static.wikia.nocookie.net/btb/images/9/9d/434.jpg',
      time_stamp: '2025-09-12T10:00:00Z',
    })
  })
})

describe('Sending Messages', () => {
  it('posts a message along with the user and the timestamp of the message to the messages table on the database', async () => {
    const message = {
      chatId: 1,
      message: 'test message from vitest',
      image: '',
      userId: 1,
      timeStamp: '2025-09-12T12:00:00Z',
    }
    const response = await request(server)
      .post('/api/v1/messages')
      .send(message)
    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body[0]).toStrictEqual({
      id: 3,
      chat_id: 1,
      message: 'test message from vitest',
      image: '',
      user_id: 1,
      time_stamp: '2025-09-12T12:00:00Z',
    })
  })
})
