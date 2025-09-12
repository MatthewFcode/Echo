import connection from '../connection'

const db = connection

// getting the messgaes by the chat id and the user id

export async function getMessagesByChatID(chatId: number) {
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
    console.log(err)
  }
}

// sending chat by the chat id and the user id
export async function sendChat(newChat: {
  chat_id: string
  message: string
  image: string
  user_id: number
  time_stamp: string
}) {
  try {
    const result = await db('messages').insert(newChat).returning('*')
    return result
  } catch (err) {
    console.log(err)
  }
}
