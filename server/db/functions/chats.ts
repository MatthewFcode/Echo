// we wanna message people provatley or we wanna add a converstation to them if we havent messaged them before (get or insert based on the users)

import connection from '../connection.ts'

const db = connection

export async function getChatByChatId(id: number) {
  try {
    const result = await db('chats').where('id', id).first()
    return result
  } catch (error) {
    console.log(error)
  }
}

export async function getAllChats(userId: number) {
  try {
    const chats = await db('chats')
      .where('user_id', userId)
      .orWhere('user_id2', userId)
      .join('users as u1', 'chats.user_id', 'u1.id')
      .join('users as u2', 'chats.user_id2', 'u2.id')
      .select(
        'chats.id',
        'u1.id as u1Id',
        'u1.user_name as u1UserName',
        'u1.auth0id as u1Auth0Id',
        'u1.profile_pic as u1ProfilePic',
        'u2.id as u2Id',
        'u2.user_name as u2UserName',
        'u2.auth0id as u2Auth0Id',
        'u2.profile_pic as u2ProfilePic',
      )
    return chats
  } catch (err) {
    console.log(err)
  }
}

export async function createChat({
  userId,
  userId2,
}: {
  userId: number
  userId2: number
}) {
  try {
    const result = await db('chats').insert({
      user_id: userId,
      user_id2: userId2,
    })
    return result
  } catch (err) {
    console.log(err)
  }
}
