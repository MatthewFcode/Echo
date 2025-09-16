export interface UserData {
  user_name: string
  auth0Id: string
  profile_pic?: string
}

export interface User extends UserData {
  id: number
}
