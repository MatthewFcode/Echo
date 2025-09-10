import request from 'superagent'
import { User, UserData } from '../../models/User'

const rootURL = new URL(`/api/v1`, document.baseURI)

// GET /api/v1/users (gets all users)
export async function getUsers(token: string) {
  const response = await request
    .get(`${rootURL}/users`)
    .set('Authorization', `Bearer ${token}`)
  return response.body as User[]
}

// GET /api/v1/users/:id (get a specific user by id)
export async function getUserById(token: string, id: number) {
  const response = await request
    .get(`${rootURL}/users/${id}`)
    .set('Authorization', `Bearer ${token}`)
  return response.body as User
}

// POST /api/v1/users (add a new user)
export async function addUser(token: string, newUser: UserData) {
  return request
    .post(`${rootURL}/users`)
    .set('Authorization', `Bearer ${token}`)
    .send(newUser)
    .then((res) => res.body.newUser)
}
