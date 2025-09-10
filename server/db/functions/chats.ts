// we wanna message people provatley or we wanna add a converstation to them if we havent messaged them before (get or insert based on the users)

import connection from '../connection.ts'

const db = connection

export async function getOrCreateChat(user1Id: number, user2Id: number) {
  try {
    let chat = await db('chats')
      .where('chats.user_id', user1Id)
      .andWhere('chats.user_id2', user2Id)
      .first()
    if (!chat) {
      chat = await db('chats').insert({ user_id: user1Id, user2Id: user2Id })
        .first
    }
    return chat
  } catch (err) {
    console.log(err)
  }
}
