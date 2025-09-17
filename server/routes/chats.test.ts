import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { StatusCodes } from 'http-status-codes'
import connection from '../db/connection'
import { server } from '../server'
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

describe('gets a chat from a chat ID', () => {
  it('takes a chat ID and returns a chat ID based on that information', async () => {
    const response = await request(server).get(`/api/v1/chats/${1}`)
    expect(response.status).toBe(StatusCodes.OK)

    const chat = response.body

    expect(chat).toHaveProperty('id')
    expect(chat.user_id).toBe(2)
    expect(chat.user_id2).toBe(1)
  })
})

describe('gets the chats for the user that is logged in and has message previously', () => {
  it('gets the ID the of the user and passes it to the function to return all its associated chats', async () => {
    const response = await request(server).get(`/api/v1/chats/all/${1}`)
    expect(response.status).toBe(StatusCodes.OK)
    // the first chat in the response for that users chats
    const chat = response.body[0]
    expect(chat).toHaveProperty('id')
    expect(chat).toHaveProperty('u1Id')
    expect(chat).toHaveProperty('u2Id')
  })
})

describe('This should create a connection between two users in the chats table', () => {
  it('takes the id of the user logged in and the user it wants to send the message to and then adds them to the chats table with a unique id', async () => {
    const response = await request(server)
      .post('/api/v1/chats')
      .send({ userId: 2, userId2: 3 })
    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body[0]).toEqual(2)
  })
})
