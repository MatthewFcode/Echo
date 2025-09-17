import request from 'superagent'
import { User } from '../../models/User'

const rootURL = new URL(`/api/v1`, document.baseURI)

interface GetUserFunction {
  token: string
}

// GET /api/v1/users/me
export async function getMe({ token }: GetUserFunction): Promise<User | null> {
  return await request
    .get(`${rootURL}/users/me`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => (res.body.user ? res.body.user : null))
    .catch((error) => console.log(error))
}

// GET /api/v1/users/:id
export async function getUserById(token: string, id: number) {
  const response = await request
    .get(`${rootURL}/users/${id}`)
    .set('Authorization', `Bearer ${token}`)
  return response.body.user[0] as User
}

// POST /api/v1/users
export async function addUser({
  formData,
  token,
}: {
  formData: FormData
  token: string
}): Promise<User> {
  const result = await request
    .post(`${rootURL}/users`)
    .set('Authorization', `Bearer ${token}`)
    .send(formData)
  return result.body
}

interface GetAllUsersFunction {
  token: string
}

// GET /api/v1/users
export async function getAllUsers({ token }: GetAllUsersFunction) {
  return await request
    .get(`${rootURL}/users`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
}
