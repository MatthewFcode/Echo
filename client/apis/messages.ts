import request from 'superagent'
import { Message, MessageData } from '../../models/Message'
import { Chat } from '../../models/Chat'

const rootURL = new URL(`/api/v1`, document.baseURI)

interface AddMessageFunction {
  newMessage: Message
  token: string
}

// POST /api/v1/messages (sends a message)
export async function addMessage({token, newMessage}: AddMessageFunction): Promise<Message> {
  console.log(request)
  return await request
    .post(`${rootURL}/messages`)
    .set('Authorization', `Bearer ${token}`)
    .send(newMessage)
    .then((res) => res.body) as unknown as Message
    
    
}

interface getMessageByChatIdFunction {
  id: Chat["id"]
  token: string
}

// GET /api/v1/messages/:id (gets messages by chat id)
export async function getMessageByChatId({token, id}: getMessageByChatIdFunction): Promise<MessageData[]> {
  const response = await request.get(`${rootURL}/messages/${id}`).set('Authorization', `Bearer ${token}`)
  return response.body as MessageData[]
}