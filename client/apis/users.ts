import request from 'superagent'
import { User, UserData } from '../../models/User'

const rootURL = new URL(`/api/v1`, document.baseURI)

interface GetUserFunction {
  token: string
}

// GET /api/v1/users (gets all users)
export async function getMe({
  token,
}: GetUserFunction): Promise<User | null> {
  return await request
    .get(`${rootURL}/users/me`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => (res.body.user ? res.body.user : null))
    .catch((error) => console.log(error))
}

// GET /api/v1/users/:id (get a specific user by id)
export async function getUserById(token: string, id: number) {
  const response = await request
    .get(`${rootURL}/users/${id}`)
    .set('Authorization', `Bearer ${token}`)
  return response.body.user[0] as User
}

interface AddUserFunction {
  newUser: UserData
  token: string
}

// POST /api/v1/users (add a new user)
export async function addUser({
  newUser,
  token,
}: AddUserFunction): Promise<User> {
  return await request
    .post(`${rootURL}/users`)
    .set('Authorization', `Bearer ${token}`)
    .send(newUser)
    .then((res) => res.body)
}
