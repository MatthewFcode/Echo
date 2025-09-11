export interface UserData {
  userName: string
  profilePic?: string
  chatId?: string
}

export interface User extends UserData {
  id: number
}
