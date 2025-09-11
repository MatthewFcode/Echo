export interface UserData {
  userName: string
  profilePic?: string
}

export interface User extends UserData {
  id: number
}
