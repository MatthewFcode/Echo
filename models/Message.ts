export interface MessageData {
  chatId: number
  message?: string
  image?: string
  userId: number
  timeStamp: string
}

export interface Message extends MessageData {
  id: number
}