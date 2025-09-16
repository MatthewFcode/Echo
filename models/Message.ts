export interface MessageData {
  usersUserName: string | undefined
  userProfilePic: string | undefined
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