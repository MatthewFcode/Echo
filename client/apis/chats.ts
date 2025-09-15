import request from 'superagent'
import { BothUsers, Chat } from '../../models/Chat'

const rootURL = new URL(`/api/v1`, document.baseURI)

// GET /api/v1/chats (gets all chats)
export async function getChats(token: string, userId: number) {
  const response = await request
    .get(`${rootURL}/chats/all/${userId}`)
    .set('Authorization', `Bearer ${token}`)
  return response.body as BothUsers[]
}

// GET /api/v1/chats/:id (gets a chat by id)
export async function getChatById(token: string, id: number) {
  const response = await request
    .get(`${rootURL}/chats/${id}`)
    .set('Authorization', `Bearer ${token}`)
  return response.body as Chat
}

// GET /api/v1/chatID (gets a chat by chatId)
export async function getChatByChatId(token: string, id: number) {
  const response = await request
    .get(`${rootURL}/chats/${id}`)
    .set('Authorization', `Bearer ${token}`)
  return response.body as Chat
}
