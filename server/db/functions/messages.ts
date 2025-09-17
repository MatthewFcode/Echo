import { Message } from '../../../models/Message'
import connection from '../connection'

const db = connection

export async function getMessagesByChatId(chatId: number) {
  try {
    const result = await db('messages')
      .join('users', 'messages.user_id', 'users.id')
      .where('messages.chat_id', chatId)
      .select(
        'messages.chat_id',
        'message',
        'image',
        'time_stamp',
        'users.user_name',
        'users.profile_pic',
      )
    return result
  } catch (err) {
    console.error(err)
    console.log(err)
  }
}

export async function getMessagesById(chat_id: number) {
  try {
    const result = await db('messages')
      .join('users', 'messages.user_id', 'users.id')
      .where('messages.chat_id', chat_id)
      .select(
        'messages.id as id',
        'chat_id as chatId',
        'message',
        'image',
        'user_id as userId',
        'time_stamp as timeStamp',
        'users.user_name as usersUserName',
        'users.profile_pic as userProfilePic'
      )
    return result as Message[]
  } catch (err) {
    console.error(err)
    console.log(err)
  }
}

export async function sendChat(newChat: {
  chat_id: number
  message: string
  image: string
  user_id: number
  time_stamp: string
}) {
  try {
    const result = await db('messages').insert(newChat)
    return result
  } catch (err) {
    console.error(err)
    console.log(err)
  }
}

export async function deleteMessage(id: number) {
  try {
    await db('messages').where({ id }).del()
  } catch (error) {
    console.error(error)
    console.log(error)
  }
}
