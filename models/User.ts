export interface UserData {
  userName: string
  auth0Id: string
  profilePic?: string
}

export interface User extends UserData {
  id: number
}


