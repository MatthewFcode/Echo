export interface MessageData {
  usersUserName: string
  userProfilePic: string
  id: number
  chatId: number
  message?: string
  image?: string
  userId: number
  timeStamp: string
  file?: undefined
}

export interface Message extends MessageData {
  id: number
}

export type MessageInit = {
  id: number
  chatId: number
  message: string
  image: string
  userId: number
  timeStamp: string
  usersUserName: string
  userProfilePic: string
}
