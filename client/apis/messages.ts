import request from 'superagent'
import { Message } from '../../models/Message'

const rootURL = new URL(`/api/v1`, document.baseURI)

// POST /api/v1/messages (sends a message)
export async function addMessage(token: string, newMessage: Message) {
  return await request
    .post(`${rootURL}/messages`)
    .set('Authorization', `Bearer ${token}`)
    .send(newMessage)
    .then((res) => res.body.newMessage)
}
