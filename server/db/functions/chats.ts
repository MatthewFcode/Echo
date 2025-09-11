// we wanna message people provatley or we wanna add a converstation to them if we havent messaged them before (get or insert based on the users)

import connection from '../connection.ts'

const db = connection

export async function getChat(userId: number, userId2: number) {
  try {
    const chat = await db('chats')
      .join('users as u1', 'chats.user_id', 'u1.id')
      .join('users as u2', 'chats.user_id2', 'u2.id')
      .where('chats.user_id', userId)
      .andWhere('chats.user_id2', userId2)
      .select(
        'chats.id',
        'u1.id as u1Id',
        'u1.user_name as u1username',
        'u1.auth0id as u1auth0id',
        'u1.profile_pic as u1profilePic',
        'u2.id as u2Id',
        'u2.user_name as u2username',
        'u2.auth0id as u2auth0id',
        'u2.profile_pic as u2profilePic',
      )
      .first()
    return chat
  } catch (err) {
    console.log(err)
  }
}

export async function getAllChats(userId: number) {
  try {
    const chats = await db('chats').where(userId).select('*')
    return chats
  } catch (err) {
    console.log(err)
  }
}

export async function createChat(userId: number, userId2: number) {
  try {
    const result = await db('chats').insert({
      user_id: userId,
      user_Id2: userId2,
    })
    return result
  } catch (err) {
    console.log(err)
  }
}
