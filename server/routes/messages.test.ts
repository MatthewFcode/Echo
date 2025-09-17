import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { StatusCodes } from 'http-status-codes'
import connection from '../db/connection'
import { server } from '../server'
import request from 'supertest'
import { MessageInit } from '../../models/Message.ts'
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
      .get(`/api/v1/messages/${1}`)
      .query({ chatId: 1 })
    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body[0]).toStrictEqual({
      chatId: expect.any(Number),
      id: expect.any(Number),
      message: 'This is a seed message',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/250px-Image_created_with_a_mobile_phone.png',
      usersUserName: 'abe',
      timeStamp: expect.any(String),
      userProfilePic:
        'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg',
      userId: expect.any(Number),
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
    expect(response.body[0]).toStrictEqual(3)
  })
})

describe('Deleting messages', () => {
  it('deletes the paticular message by its unique Id from the paticular chat that it was in', async () => {
    const result = await request(server).delete(`/api/v1/messages/${2}`)
    expect(result.status).toBe(StatusCodes.NO_CONTENT)

    const getAfterDelete = await request(server).get('/api/v1/messages/1')
    const messages = getAfterDelete.body
    const deletedMsg = messages.find((msg: MessageInit) => msg.id === 2)
    expect(deletedMsg).toBeUndefined()
  })
})
