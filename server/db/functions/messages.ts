import connection from "../connection"


const db = connection

// getting the messgaes by the chat id and the user id

export async function getMessagesByChatIDAndUserId(chatId: number, userId:number) {
  try {
    const result = await db('messages')
    .join('users', 'messages.user_id', 'users.id')
    .where('messages.chat_id', chatId)
    .andWhere('messages.user_id', userId)
    .select('message', 'image', 'time_stamp', 'users.user_name', 'users.profile_pic')
    return result
  }
  catch (err) {
    console.log(err)
  }
}

// sending chat by the chat id and the user id
export async function sendChat(newChat: {chat_id: string, }) {
  try {
    const result = await db('messages').insert({})
  }
}