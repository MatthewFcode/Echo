import connection from '../connection.ts'
import { UserData } from '../../../models/User.ts'
const db = connection

export async function getAllUsers() {
  try {
    const result = await db('users').select()
    return result
  } catch (err) {
    console.log(err)
  }
}

export async function getUserById(
  auth0Id: string,
): Promise<UserData[] | undefined> {
  try {
    const result = await db('users').where('users.auth0id', auth0Id).first()
    return result
  } catch (err) {
    console.log(err)
  }
}

export async function getUserByUserId(
  id: number,
): Promise<UserData[] | undefined> {
  try {
    const result = await db('users')
      .where('users.id', id)
      .select(
        'id as id',
        'auth0id as auth0Id',
        'user_name as userName',
        'profile_pic as profilePic',
      )
    return result
  } catch (err) {
    console.log(err)
  }
}

export async function createUser(newUser: {
  auth0id: string
  user_name: string
  profile_pic: string
}): Promise<UserData[] | undefined> {
  try {
    const result = await db('users').insert(newUser).returning('*')
    return result
  } catch (err) {
    console.log(err)
  }
}
